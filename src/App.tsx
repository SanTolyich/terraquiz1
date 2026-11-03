import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Country,
  COUNTRIES,
  COUNTRIES_BY_ID,
  CONTINENTS,
  ContinentFilter,
  generateOptions,
  checkAnswerRussian,
} from './data/countries';
import { WorldMap } from './components/WorldMap';
import { TopBar } from './components/TopBar';
import { QuestionCard } from './components/QuestionCard';
import { LearningMode } from './components/LearningMode';
import { ExploreMode } from './components/ExploreMode';
import { SettingsModal } from './components/SettingsModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { AtlasExplorer } from './components/AtlasExplorer';
import {
  AppMode,
  AppSettings,
  ScoreState,
  LearningState,
  loadSettings,
  saveSettings,
  loadSavedScore,
  saveScore,
  loadLearningState,
  saveLearningState,
  recordPairResult,
  getAnalyzedRegionStats,
  getPairRanking,
} from './utils/stats';
import { sound } from './utils/audio';
import { Layers, RotateCcw, ArrowRightLeft, Sparkles, AlertTriangle, Search, BookOpen, Compass } from 'lucide-react';

export default function App() {
  // Настройки и текущий режим
  const [currentMode, setCurrentMode] = useState<AppMode>('DIRECT');
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isMuted, setIsMuted] = useState(() => sound.isMuted());

  // Статистика счета вопросов
  const [score, setScore] = useState<ScoreState>(loadSavedScore);

  // Прогресс режима обучения
  const [learningState, setLearningState] = useState<LearningState>(loadLearningState);
  const [learningCountry, setLearningCountry] = useState<Country | null>(COUNTRIES[0]);

  // Состояние режима исследования
  const [exploreCountry, setExploreCountry] = useState<Country | null>(COUNTRIES[0]);
  const [exploreFocusTrigger, setExploreFocusTrigger] = useState(0);

  // Очередь вопросов для тестирования
  const [questionPool, setQuestionPool] = useState<Country[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  // Состояние текущего вопроса
  const [hasAnsweredText, setHasAnsweredText] = useState(false);
  const [isTextCorrect, setIsTextCorrect] = useState<boolean | null>(null);

  // Состояние контурной карты
  const [mapPhaseActive, setMapPhaseActive] = useState(false);
  const [mapGuessCompleted, setMapGuessCompleted] = useState(false);
  const [mapFeedback, setMapFeedback] = useState<{
    isSuccess: boolean;
    clickedName?: string;
    message: string;
  } | null>(null);

  // Подсветка на карте
  const [correctCountryId, setCorrectCountryId] = useState<string | null>(null);
  const [wrongCountryId, setWrongCountryId] = useState<string | null>(null);
  const [selectedAtlasCountry, setSelectedAtlasCountry] = useState<Country | null>(null);

  // Текущая целевая страна теста
  const currentTargetCountry = questionPool[currentQuestionIndex] || null;

  // Инициализация пула вопросов
  const initQuestions = useCallback((customCountries?: Country[]) => {
    let pool = customCountries;
    if (!pool || pool.length === 0) {
      pool = COUNTRIES.filter((c) => {
        if (c.id === '010' || c.id === '260') return false; // Полярные станции исключены из викторины
        return settings.continent === 'Все' || c.continent === settings.continent;
      });
    }

    if (pool.length === 0) {
      pool = COUNTRIES;
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setQuestionPool(shuffled);
    setCurrentQuestionIndex(0);
    setHasAnsweredText(false);
    setIsTextCorrect(null);
    setMapPhaseActive(false);
    setMapGuessCompleted(false);
    setMapFeedback(null);
    setCorrectCountryId(null);
    setWrongCountryId(null);
  }, [settings.continent]);

  useEffect(() => {
    initQuestions();
  }, [initQuestions]);

  // Варианты ответов для текущего вопроса
  const options = useMemo(() => {
    if (!currentTargetCountry || settings.inputMode === 'MANUAL') return [];
    const count = settings.inputMode === 'CHOICE_5' ? 5 : 3;
    return generateOptions(currentTargetCountry, currentMode === 'DIRECT' ? 'DIRECT' : 'REVERSE', count);
  }, [currentTargetCountry, currentMode, settings.inputMode]);

  // Обработка текстового или кнопочного ответа
  const handleAnswerSubmit = (userInput: string) => {
    if (hasAnsweredText || !currentTargetCountry) return;

    let correct = false;
    if (settings.inputMode === 'MANUAL') {
      correct = checkAnswerRussian(
        userInput,
        currentTargetCountry,
        currentMode === 'DIRECT' ? 'DIRECT' : 'REVERSE'
      );
    } else {
      correct = userInput === currentTargetCountry.id;
    }

    setHasAnsweredText(true);
    setIsTextCorrect(correct);

    // Записываем результат в общую статистику
    const newScore: ScoreState = {
      ...score,
      totalQuestions: score.totalQuestions + 1,
      correctAnswers: score.correctAnswers + (correct ? 1 : 0),
      wrongAttempts: score.wrongAttempts + (correct ? 0 : 1),
      streak: correct ? score.streak + 1 : 0,
      bestStreak: correct ? Math.max(score.bestStreak, score.streak + 1) : score.bestStreak,
    };
    setScore(newScore);
    saveScore(newScore);

    // Записываем учет по регионам и по конкретной паре страна-столица!
    recordPairResult(currentTargetCountry.id, currentTargetCountry.continent, correct);

    if (correct) {
      sound.playCorrect();
      if (newScore.streak >= 3) {
        sound.playStreak();
      }

      if (settings.askMapLocation) {
        // Начинаем фазу поиска на контурной карте БЕЗ подсветки страны
        setMapPhaseActive(true);
        setMapGuessCompleted(false);
        setCorrectCountryId(null);
        setWrongCountryId(null);
      } else {
        // Подсвечиваем страну только ПОСЛЕ верного ответа
        setCorrectCountryId(currentTargetCountry.id);
        setMapGuessCompleted(true);
      }
    } else {
      sound.playWrong();
      // При ошибке сразу показываем правильное расположение страны со стрелкой
      setCorrectCountryId(currentTargetCountry.id);
      setWrongCountryId(userInput);
      setMapPhaseActive(false);
      setMapGuessCompleted(true);
    }
  };

  // Клик по карте
  const handleMapCountryClick = (country: Country | null, rawId: string) => {
    sound.playClick();

    if (currentMode === 'EXPLORE') {
      if (country) {
        setExploreCountry(country);
        setExploreFocusTrigger((prev) => prev + 1);
      } else {
        const found = COUNTRIES_BY_ID[rawId];
        if (found) {
          setExploreCountry(found);
          setExploreFocusTrigger((prev) => prev + 1);
        }
      }
      return;
    }

    if (currentMode === 'ATLAS') {
      if (country) {
        setSelectedAtlasCountry(country);
      } else {
        const found = COUNTRIES_BY_ID[rawId];
        if (found) setSelectedAtlasCountry(found);
      }
      return;
    }

    if (currentMode === 'LEARNING') {
      if (country) {
        setLearningCountry(country);
      } else {
        const found = COUNTRIES_BY_ID[rawId];
        if (found) setLearningCountry(found);
      }
      return;
    }

    // Если идет фаза указания на контурной карте
    if (mapPhaseActive && !mapGuessCompleted && currentTargetCountry) {
      const isTarget = rawId === currentTargetCountry.id;

      if (isTarget) {
        sound.playCorrect();
        setCorrectCountryId(currentTargetCountry.id);
        setWrongCountryId(null);
        setMapFeedback({
          isSuccess: true,
          message: 'Точно в цель! Вы безупречно указали страну на контурной карте!',
        });

        const bonusScore: ScoreState = {
          ...score,
          mapAccurateCount: score.mapAccurateCount + 1,
        };
        setScore(bonusScore);
        saveScore(bonusScore);
      } else {
        sound.playWrong();
        const clicked = COUNTRIES_BY_ID[rawId];
        setCorrectCountryId(currentTargetCountry.id);
        setWrongCountryId(rawId);
        setMapFeedback({
          isSuccess: false,
          clickedName: clicked ? clicked.name : rawId,
          message: clicked
            ? `Вы нажали на ${clicked.name}, а ${currentTargetCountry.name} находится здесь:`
            : `Страна ${currentTargetCountry.name} находится здесь:`,
        });
      }

      setMapGuessCompleted(true);
    }
  };

  // Ховер по карте в режиме исследования
  const handleMapCountryHover = (country: Country | null, rawId: string) => {
    if (currentMode === 'EXPLORE') {
      if (country) {
        setExploreCountry(country);
      } else {
        const found = COUNTRIES_BY_ID[rawId];
        if (found) setExploreCountry(found);
      }
    }
  };

  // Пропуск контурной карты
  const handleSkipMapGuess = () => {
    sound.playClick();
    if (currentTargetCountry) {
      setCorrectCountryId(currentTargetCountry.id);
      setMapGuessCompleted(true);
      setMapFeedback({
        isSuccess: true,
        message: `Вот где находится ${currentTargetCountry.name}:`,
      });
    }
  };

  // Переход к следующему вопросу
  const handleNextQuestion = () => {
    sound.playClick();
    setHasAnsweredText(false);
    setIsTextCorrect(null);
    setMapPhaseActive(false);
    setMapGuessCompleted(false);
    setMapFeedback(null);
    setCorrectCountryId(null);
    setWrongCountryId(null);
    setQuestionNumber((prev) => prev + 1);

    if (currentQuestionIndex + 1 < questionPool.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      initQuestions();
    }
  };

  // Обновление настроек
  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Обновление состояния обучения
  const handleUpdateLearningState = (newLearning: LearningState) => {
    setLearningState(newLearning);
    saveLearningState(newLearning);
  };

  // Сброс раунда вопросов
  const handleResetRound = () => {
    sound.playClick();
    initQuestions();
  };

  // Аналитические рекомендации
  const regionStats = useMemo(() => getAnalyzedRegionStats(), [score]);
  const { worstPairs } = useMemo(() => getPairRanking(), [score]);

  const weakestRegion = useMemo(() => {
    return [...regionStats].filter((r) => r.total >= 2).sort((a, b) => a.accuracy - b.accuracy)[0] || null;
  }, [regionStats]);

  // Тренировка конкретного региона
  const handleTrainRegion = (region: string) => {
    handleUpdateSettings({ ...settings, continent: region });
    setCurrentMode('DIRECT');
  };

  // Тренировка слабых пар
  const handleTrainWeakPairs = (countries: Country[]) => {
    setCurrentMode('DIRECT');
    initQuestions(countries);
  };

  // Обучение по слабым парам
  const handleLearnWeakPairs = () => {
    setCurrentMode('LEARNING');
  };

  // Подсветка страны на карте
  const targetCountryIdToHighlight = useMemo(() => {
    if (currentMode === 'EXPLORE') {
      return exploreCountry?.id || null;
    }
    if (currentMode === 'LEARNING') {
      return learningCountry?.id || null;
    }
    if (currentMode === 'ATLAS') {
      return selectedAtlasCountry?.id || null;
    }

    if (!hasAnsweredText) {
      return null;
    }

    if (settings.askMapLocation) {
      if (mapGuessCompleted || isTextCorrect === false) {
        return currentTargetCountry?.id || null;
      }
      return null;
    } else {
      return currentTargetCountry?.id || null;
    }
  }, [
    currentMode,
    exploreCountry,
    learningCountry,
    selectedAtlasCountry,
    hasAnsweredText,
    settings.askMapLocation,
    mapGuessCompleted,
    isTextCorrect,
    currentTargetCountry,
  ]);

  // Показывать ли большую точку столицы со стрелкой
  const shouldShowCapitalPin = useMemo(() => {
    if (currentMode === 'EXPLORE') return true;
    if (currentMode === 'LEARNING') return true;
    if (currentMode === 'ATLAS') return !!selectedAtlasCountry;
    return hasAnsweredText && (mapGuessCompleted || isTextCorrect === false);
  }, [currentMode, selectedAtlasCountry, hasAnsweredText, mapGuessCompleted, isTextCorrect]);

  const accuracy =
    score.totalQuestions > 0
      ? Math.round((score.correctAnswers / score.totalQuestions) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Верхняя панель навигации (компактная) */}
      <TopBar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          sound.playClick();
          setCurrentMode(mode);
          setHasAnsweredText(false);
          setMapPhaseActive(false);
          setMapGuessCompleted(false);
          setCorrectCountryId(null);
          setWrongCountryId(null);
        }}
        onOpenSettings={() => {
          sound.playClick();
          setShowSettings(true);
        }}
        onOpenAnalytics={() => {
          sound.playClick();
          setShowAnalytics(true);
        }}
        isMuted={isMuted}
        onToggleMute={() => {
          const muted = sound.toggleMute();
          setIsMuted(muted);
        }}
      />

      {/* 2. Основное рабочее пространство (минимальная прокрутка, все умещается на одном экране) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-3 flex flex-col gap-2 min-h-0">
        {/* Мобильная панель быстрого переключения режимов (для экранов < md) */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto pb-0.5 text-xs shrink-0">
          <button
            onClick={() => setCurrentMode('DIRECT')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap font-medium transition-colors ${
              currentMode === 'DIRECT' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Столица → Страна
          </button>
          <button
            onClick={() => setCurrentMode('REVERSE')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1 ${
              currentMode === 'REVERSE' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span>Страна → Столица</span>
          </button>
          <button
            onClick={() => setCurrentMode('EXPLORE')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1 ${
              currentMode === 'EXPLORE' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Search className="w-3 h-3" />
            <span>Исследование</span>
          </button>
          <button
            onClick={() => setCurrentMode('LEARNING')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1 ${
              currentMode === 'LEARNING' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Обучение</span>
          </button>
          <button
            onClick={() => setCurrentMode('ATLAS')}
            className={`px-2 py-1 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1 ${
              currentMode === 'ATLAS' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Compass className="w-3 h-3" />
            <span>Атлас</span>
          </button>
        </div>

        {/* Компактная полоса управления: Регионы + Счет + Быстрое переключение */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-900/80 px-2.5 py-1.5 rounded-xl border border-slate-800 shrink-0">
          {/* Регионы */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="px-1.5 py-0.5 text-slate-400 font-semibold flex items-center gap-1 shrink-0 text-[11px]">
              <Layers className="w-3 h-3 text-amber-400" />
              <span>Регион:</span>
            </span>
            {CONTINENTS.map((cont) => (
              <button
                key={cont}
                onClick={() => {
                  sound.playClick();
                  handleUpdateSettings({ ...settings, continent: cont });
                }}
                className={`px-2 py-0.5 font-medium rounded-md transition-colors whitespace-nowrap shrink-0 text-xs ${
                  settings.continent === cont
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cont}
              </button>
            ))}
          </div>

          {/* Правая часть полосы: Счет в викторине + переключение режима + заново */}
          <div className="flex items-center gap-3">
            {(currentMode === 'DIRECT' || currentMode === 'REVERSE') && (
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
                <span className="font-mono text-slate-200 font-bold">#{questionNumber}</span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400 font-bold font-mono">✓ {score.correctAnswers}</span>
                <span className="text-rose-400 font-bold font-mono">✗ {score.wrongAttempts}</span>
                <span className="text-slate-600">·</span>
                <span className="text-sky-300 font-mono">{accuracy}%</span>
                {score.streak > 1 && (
                  <span className="text-amber-400 font-bold flex items-center gap-0.5">
                    🔥 {score.streak}
                  </span>
                )}
              </div>
            )}

            {(weakestRegion && weakestRegion.accuracy < 65) && (
              <button
                onClick={() => handleTrainRegion(weakestRegion.continent)}
                className="hidden lg:flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded text-[11px] font-medium hover:bg-amber-500/20 transition-colors"
                title={`Точность в регионе ${weakestRegion.continent} всего ${weakestRegion.accuracy}%. Нажмите для тренировки.`}
              >
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>Подтянуть {weakestRegion.continent}</span>
              </button>
            )}

            {(currentMode === 'DIRECT' || currentMode === 'REVERSE') && (
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentMode((prev) => (prev === 'DIRECT' ? 'REVERSE' : 'DIRECT'));
                  setHasAnsweredText(false);
                  setMapPhaseActive(false);
                  setMapGuessCompleted(false);
                  setCorrectCountryId(null);
                  setWrongCountryId(null);
                }}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors flex items-center gap-1 text-[11px] font-medium shrink-0"
              >
                <ArrowRightLeft className="w-3 h-3 text-amber-400" />
                <span>
                  {currentMode === 'DIRECT' ? 'Страна → Столица' : 'Столица → Страна'}
                </span>
              </button>
            )}

            {(currentMode === 'DIRECT' || currentMode === 'REVERSE') && (
              <button
                onClick={handleResetRound}
                className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors shrink-0"
                title="Начать заново"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 3. Компактный блок квиза / подсказки / исследования */}
        <div className="w-full shrink-0">
          {currentMode === 'EXPLORE' ? (
            <ExploreMode
              currentCountry={exploreCountry}
              onSelectCountry={(c) => {
                sound.playClick();
                setExploreCountry(c);
              }}
              onZoomToCountry={(c) => {
                sound.playClick();
                setExploreCountry(c);
                setExploreFocusTrigger((prev) => prev + 1);
              }}
              onStartQuizWithCountry={(c) => {
                sound.playClick();
                setCurrentMode('DIRECT');
                setQuestionPool([c]);
                setCurrentQuestionIndex(0);
                setHasAnsweredText(false);
                setMapPhaseActive(false);
                setMapGuessCompleted(false);
              }}
            />
          ) : currentMode === 'LEARNING' ? (
            <LearningMode
              currentCountry={learningCountry}
              onSelectCountry={(c) => {
                setLearningCountry(c);
              }}
              learningState={learningState}
              onUpdateLearningState={handleUpdateLearningState}
              continentFilter={settings.continent as ContinentFilter}
              onContinentChange={(c) => handleUpdateSettings({ ...settings, continent: c })}
            />
          ) : currentMode === 'ATLAS' ? (
            <AtlasExplorer
              selectedCountry={selectedAtlasCountry}
              onSelectCountry={(c) => {
                sound.playClick();
                setSelectedAtlasCountry(c);
              }}
              onStartQuizWithCountry={(c) => {
                sound.playClick();
                setCurrentMode('DIRECT');
                setQuestionPool([c]);
                setCurrentQuestionIndex(0);
                setHasAnsweredText(false);
                setMapPhaseActive(false);
                setMapGuessCompleted(false);
              }}
              continentFilter={settings.continent as ContinentFilter}
              onContinentChange={(c) => handleUpdateSettings({ ...settings, continent: c })}
            />
          ) : currentTargetCountry ? (
            <QuestionCard
              mode={currentMode}
              targetCountry={currentTargetCountry}
              inputMode={settings.inputMode}
              options={options}
              askMapLocation={settings.askMapLocation}
              hasAnsweredText={hasAnsweredText}
              isTextCorrect={isTextCorrect}
              mapPhaseActive={mapPhaseActive}
              mapGuessCompleted={mapGuessCompleted}
              mapFeedback={mapFeedback}
              onSelectOption={handleAnswerSubmit}
              onSubmitManualText={handleAnswerSubmit}
              onSkipMapGuess={handleSkipMapGuess}
              onNextQuestion={handleNextQuestion}
            />
          ) : null}
        </div>

        {/* 4. Блок интерактивной карты, заполняющий все пространство */}
        <div
          className={`w-full flex-1 transition-all duration-300 ${
            currentMode === 'EXPLORE'
              ? 'min-h-[500px] sm:min-h-[520px] lg:min-h-[580px]'
              : currentMode === 'LEARNING'
              ? 'min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]'
              : 'min-h-[340px] sm:min-h-[400px] lg:min-h-[460px]'
          }`}
        >
          <WorldMap
            selectedCountryId={
              currentMode === 'ATLAS'
                ? selectedAtlasCountry?.id
                : currentMode === 'LEARNING'
                ? learningCountry?.id
                : currentMode === 'EXPLORE'
                ? exploreCountry?.id
                : null
            }
            targetCountryId={targetCountryIdToHighlight}
            correctCountryId={correctCountryId}
            wrongCountryId={wrongCountryId}
            onCountryClick={handleMapCountryClick}
            onCountryHover={handleMapCountryHover}
            showCapitalPin={shouldShowCapitalPin}
            pinCountry={
              currentMode === 'EXPLORE'
                ? exploreCountry
                : currentMode === 'LEARNING'
                ? learningCountry
                : currentMode === 'ATLAS'
                ? selectedAtlasCountry
                : currentTargetCountry
            }
            continentFocus={settings.continent}
            isMapGuessPhase={mapPhaseActive && !mapGuessCompleted}
            targetCountryName={currentTargetCountry?.name}
            allowHoverTooltip={currentMode === 'ATLAS'}
            isExploreMode={currentMode === 'EXPLORE'}
            mapFeedback={mapFeedback}
            focusTrigger={exploreFocusTrigger}
          />
        </div>
      </main>

      {/* Модальное окно настроек */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setShowSettings(false)}
          onResetScore={(fresh) => setScore(fresh)}
        />
      )}

      {/* Модальное окно аналитики и рекомендаций */}
      {showAnalytics && (
        <AnalyticsModal
          onClose={() => setShowAnalytics(false)}
          onTrainRegion={handleTrainRegion}
          onTrainWeakPairs={handleTrainWeakPairs}
          onLearnWeakPairs={handleLearnWeakPairs}
        />
      )}
    </div>
  );
}

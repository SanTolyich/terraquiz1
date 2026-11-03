import React, { useState, useMemo } from 'react';
import { Country, COUNTRIES, ContinentFilter } from '../data/countries';
import { LearningState, loadPairStats, sortCountriesByWeakness } from '../utils/stats';
import {
  BookOpen,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Shuffle,
  Zap
} from 'lucide-react';
import { sound } from '../utils/audio';

interface LearningModeProps {
  currentCountry: Country | null;
  onSelectCountry: (country: Country) => void;
  learningState: LearningState;
  onUpdateLearningState: (state: LearningState) => void;
  continentFilter: ContinentFilter;
  onContinentChange: (continent: ContinentFilter) => void;
}

export const LearningMode: React.FC<LearningModeProps> = ({
  currentCountry,
  onSelectCountry,
  learningState,
  onUpdateLearningState,
  continentFilter,
}) => {
  const [prioritizeWeak, setPrioritizeWeak] = useState(true);
  const pairStats = useMemo(() => loadPairStats(), []);

  // Фильтруем страны по континенту и сортируем по слабости
  const filteredCountries = useMemo(() => {
    const raw = COUNTRIES.filter((c) => {
      return continentFilter === 'Все' || c.continent === continentFilter;
    });

    if (prioritizeWeak) {
      return sortCountriesByWeakness(raw);
    }
    return raw;
  }, [continentFilter, prioritizeWeak]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const activeCountry = currentCountry || filteredCountries[currentIndex] || COUNTRIES[0];

  const handleNext = () => {
    sound.playClick();
    const nextIdx = (currentIndex + 1) % filteredCountries.length;
    setCurrentIndex(nextIdx);
    onSelectCountry(filteredCountries[nextIdx]);
  };

  const handlePrev = () => {
    sound.playClick();
    const prevIdx = (currentIndex - 1 + filteredCountries.length) % filteredCountries.length;
    setCurrentIndex(prevIdx);
    onSelectCountry(filteredCountries[prevIdx]);
  };

  const handleShuffle = () => {
    sound.playClick();
    const randIdx = Math.floor(Math.random() * filteredCountries.length);
    setCurrentIndex(randIdx);
    onSelectCountry(filteredCountries[randIdx]);
  };

  const isLearned = learningState.learnedIds.includes(activeCountry.id);
  const isReview = learningState.reviewIds.includes(activeCountry.id);

  const handleMarkLearned = () => {
    sound.playCorrect();
    const newLearned = Array.from(new Set([...learningState.learnedIds, activeCountry.id]));
    const newReview = learningState.reviewIds.filter((id) => id !== activeCountry.id);
    onUpdateLearningState({ learnedIds: newLearned, reviewIds: newReview });
    handleNext();
  };

  const handleMarkReview = () => {
    sound.playClick();
    const newReview = Array.from(new Set([...learningState.reviewIds, activeCountry.id]));
    const newLearned = learningState.learnedIds.filter((id) => id !== activeCountry.id);
    onUpdateLearningState({ learnedIds: newLearned, reviewIds: newReview });
    handleNext();
  };

  const learnedCount = filteredCountries.filter((c) =>
    learningState.learnedIds.includes(c.id)
  ).length;

  const progressPct =
    filteredCountries.length > 0
      ? Math.round((learnedCount / filteredCountries.length) * 100)
      : 0;

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-800 p-2.5 sm:p-3 shadow-lg flex flex-col gap-2">
      {/* 1. Верхняя панель навигации обучения */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold shrink-0">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-white text-xs">Режим обучения</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-mono text-[11px]">
            Карточка {currentIndex + 1} из {filteredCountries.length}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>Выучено: {learnedCount} ({progressPct}%)</span>
          </span>
        </div>

        {/* Переключатель сложных пар и навигация */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playClick();
              setPrioritizeWeak((prev) => !prev);
              setCurrentIndex(0);
            }}
            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all ${
              prioritizeWeak
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
            }`}
            title="Обучение в первую очередь по парам с ошибками"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>{prioritizeWeak ? 'Сложные в начале' : 'По порядку'}</span>
          </button>

          <button
            onClick={handlePrev}
            className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            title="Предыдущая страна"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleShuffle}
            className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            title="Случайная страна"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleNext}
            className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            title="Следующая страна"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Компактная карточка изучаемой страны (оставляет максимум места карте!) */}
      <div className="bg-slate-950/80 rounded-lg p-2.5 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl leading-none">{activeCountry.flag}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-sm sm:text-base leading-tight">
                  {activeCountry.name}
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium border border-slate-700/60">
                  {activeCountry.continent}
                </span>
                {isLearned && (
                  <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle className="w-2.5 h-2.5" />
                    <span>Выучено</span>
                  </span>
                )}
                {isReview && (
                  <span className="text-amber-400 text-[10px] font-semibold flex items-center gap-0.5 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    <Clock className="w-2.5 h-2.5" />
                    <span>Повторить</span>
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">{activeCountry.nameEn}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300 text-[11px]">Столица:</span>
            <span className="font-bold text-amber-300 text-xs sm:text-sm">
              {activeCountry.capital}
            </span>
          </div>
        </div>

        {/* Факт о стране */}
        {activeCountry.trivia && (
          <div className="flex-1 flex items-start gap-1.5 px-2 py-1 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300 text-[11px] leading-relaxed line-clamp-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-amber-300 font-semibold mr-1">Факт:</strong>
              {activeCountry.trivia}
            </span>
          </div>
        )}

        {/* Кнопки отметки статуса */}
        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
          <button
            onClick={handleMarkLearned}
            className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1 shadow-sm active:scale-95"
          >
            <CheckCircle className="w-3 h-3" />
            <span>Знаю</span>
          </button>

          <button
            onClick={handleMarkReview}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1 active:scale-95"
          >
            <Clock className="w-3 h-3" />
            <span>Повторить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

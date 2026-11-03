import React, { useState, useEffect } from 'react';
import { Country } from '../data/countries';
import { AppMode, AnswerInputMode } from '../utils/stats';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  Send,
  Navigation,
  Globe2
} from 'lucide-react';

interface QuestionCardProps {
  mode: AppMode;
  targetCountry: Country;
  inputMode: AnswerInputMode;
  options: { id: string; label: string; isCorrect: boolean }[];
  askMapLocation: boolean;
  hasAnsweredText: boolean;
  isTextCorrect: boolean | null;
  mapPhaseActive: boolean;
  mapGuessCompleted: boolean;
  mapFeedback: { isSuccess: boolean; message: string } | null;
  onSelectOption: (choiceIdOrText: string) => void;
  onSubmitManualText: (text: string) => void;
  onSkipMapGuess: () => void;
  onNextQuestion: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  mode,
  targetCountry,
  inputMode,
  options,
  askMapLocation,
  hasAnsweredText,
  isTextCorrect,
  mapPhaseActive,
  mapGuessCompleted,
  mapFeedback,
  onSelectOption,
  onSubmitManualText,
  onSkipMapGuess,
  onNextQuestion,
}) => {
  const [manualInput, setManualInput] = useState('');

  // Сброс поля ввода при смене вопроса
  useEffect(() => {
    setManualInput('');
  }, [targetCountry]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim() || hasAnsweredText) return;
    onSubmitManualText(manualInput.trim());
  };

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-800 p-2.5 sm:p-3 shadow-lg flex flex-col gap-2">
      {/* Шапка вопроса: компактная, шрифт аккуратный */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-400">
          <Globe2 className="w-3 h-3" />
          <span>
            {mode === 'DIRECT'
              ? 'Столица → Страна'
              : 'Страна → Столица'}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-normal">{targetCountry.continent}</span>
        </div>

        {mode === 'DIRECT' ? (
          <div className="flex items-baseline gap-1.5 text-xs">
            <span className="text-slate-400">Столица какой страны:</span>
            <span className="font-bold text-amber-300 text-sm sm:text-base font-heading">
              «{targetCountry.capital}»
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Столица страны:</span>
            <span className="text-lg leading-none">{targetCountry.flag}</span>
            <span className="font-bold text-sky-300 text-sm sm:text-base font-heading">
              {targetCountry.name}
            </span>
          </div>
        )}
      </div>

      {/* Варианты ответов: компактные аккуратные кнопки */}
      {!hasAnsweredText && (
        <>
          {inputMode === 'MANUAL' ? (
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                autoFocus
                placeholder={
                  mode === 'DIRECT'
                    ? 'Название страны (например: Франция)...'
                    : 'Название столицы (например: Париж)...'
                }
                className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!manualInput.trim()}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1 shrink-0 active:scale-95"
              >
                <span>Ответить</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          ) : (
            <div
              className={`grid gap-1.5 ${
                options.length === 5 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-3'
              }`}
            >
              {options.map((opt, idx) => (
                <button
                  key={`${opt.id}-${idx}`}
                  onClick={() => onSelectOption(opt.id)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700/90 border border-slate-700/80 rounded-lg text-xs font-medium text-slate-100 transition-all text-left flex items-center justify-between gap-1.5 shadow-sm active:scale-[0.98] hover:border-amber-400/50"
                >
                  <span className="truncate">{opt.label}</span>
                  <span className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-[8px] text-slate-400 shrink-0 font-mono">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Фаза указания на контурной карте */}
      {hasAnsweredText && isTextCorrect && askMapLocation && mapPhaseActive && !mapGuessCompleted && (
        <div className="py-1.5 px-2.5 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-between gap-2 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-200">
              Отлично! Укажите на контурной карте ниже:{' '}
              <strong className="text-amber-300">{targetCountry.name}</strong>
            </span>
          </div>

          <button
            onClick={onSkipMapGuess}
            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[11px] font-medium border border-slate-700 transition-colors shrink-0"
          >
            Пропустить
          </button>
        </div>
      )}

      {/* Итоговый вердикт и образовательный факт */}
      {hasAnsweredText && (!askMapLocation || !isTextCorrect || mapGuessCompleted) && (
        <div
          className={`py-2 px-3 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs animate-in fade-in duration-200 ${
            isTextCorrect
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-100'
              : 'bg-rose-950/40 border-rose-800/60 text-rose-100'
          }`}
        >
          <div className="flex items-start gap-2">
            {isTextCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-1.5 font-bold">
                <span className={isTextCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                  {isTextCorrect ? 'Верно!' : 'Неверно!'}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-white">
                  {targetCountry.flag} {targetCountry.name}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-amber-300 font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>Столица: {targetCountry.capital}</span>
                </span>
              </div>

              {mapFeedback && (
                <span className="font-medium text-amber-300 text-[11px]">
                  {mapFeedback.message}
                </span>
              )}

              <p className="text-slate-300 text-[11px] flex items-center gap-1 line-clamp-1">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{targetCountry.trivia}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onNextQuestion}
            className="px-3 py-1 bg-white text-slate-950 hover:bg-slate-200 font-bold text-xs rounded-lg transition-all flex items-center gap-1 shrink-0 shadow-sm active:scale-95 self-end sm:self-center"
          >
            <span>Дальше</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

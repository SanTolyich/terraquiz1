import React from 'react';
import { Flame, CheckCircle, XCircle, HelpCircle, Target } from 'lucide-react';
import { ScoreState } from '../utils/stats';

interface ScoreBoardProps {
  score: ScoreState;
  questionNumber: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, questionNumber }) => {
  const accuracy =
    score.totalQuestions > 0
      ? Math.round((score.correctAnswers / score.totalQuestions) * 100)
      : 0;

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-4 py-2.5 px-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400">
      {/* Счетчик текущего вопроса */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500 font-medium">Вопрос:</span>
        <span className="text-slate-100 font-semibold font-mono tabular-nums text-sm">
          #{questionNumber}
        </span>
      </div>

      {/* Основные показатели: Всего / Правильно / Ошибки / Точность */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-400">Всего вопросов:</span>
          <span className="text-slate-200 font-bold font-mono tabular-nums">
            {score.totalQuestions}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">Правильно:</span>
          <span className="text-emerald-400 font-bold font-mono tabular-nums">
            {score.correctAnswers}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-slate-400">Ошибок:</span>
          <span className="text-rose-400 font-bold font-mono tabular-nums">
            {score.wrongAttempts}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-400">Точность:</span>
          <span className="text-sky-300 font-bold font-mono tabular-nums">
            {accuracy}%
          </span>
        </div>

        {score.streak > 1 && (
          <div className="flex items-center gap-1.5 text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span className="font-bold font-mono tabular-nums">Серия: {score.streak}</span>
          </div>
        )}
      </div>
    </div>
  );
};

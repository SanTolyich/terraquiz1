import React from 'react';
import {
  getAnalyzedRegionStats,
  getPairRanking,
  RegionStat,
} from '../utils/stats';
import { Country } from '../data/countries';
import {
  BarChart3,
  X,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Play,
  Layers,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/audio';

interface AnalyticsModalProps {
  onClose: () => void;
  onTrainRegion: (region: string) => void;
  onTrainWeakPairs: (countries: Country[]) => void;
  onLearnWeakPairs: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  onClose,
  onTrainRegion,
  onTrainWeakPairs,
  onLearnWeakPairs,
}) => {
  const regionStats = getAnalyzedRegionStats();
  const { worstPairs, bestPairs } = getPairRanking();

  // Находим самый слабый регион
  const weakestRegion: RegionStat | null = [...regionStats]
    .filter((r) => r.total > 0)
    .sort((a, b) => a.accuracy - b.accuracy)[0] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Шапка аналитики */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">
                Аналитика знаний и рекомендации
              </h3>
              <p className="text-xs text-slate-400">
                Учёт по регионам и персональный рейтинг пар страна-столица
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Тело со скроллом */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {/* Рекомендация по слабому региону */}
          {weakestRegion && weakestRegion.total > 0 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>Рекомендация: подтяните регион «{weakestRegion.continent}»</span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    Ваша точность по этому региону составляет{' '}
                    <strong className="text-amber-400 font-mono">{weakestRegion.accuracy}%</strong>{' '}
                    ({weakestRegion.correct} из {weakestRegion.total}). Рекомендуем уделить ему внимание!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onTrainRegion(weakestRegion.continent);
                  onClose();
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Подтянуть {weakestRegion.continent}</span>
              </button>
            </div>
          )}

          {/* Статистика по регионам */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Успеваемость по регионам мира:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {regionStats.map((r) => {
                let badge = 'text-slate-400 bg-slate-800';
                let label = 'Мало данных';
                if (r.total >= 2) {
                  if (r.accuracy >= 80) {
                    badge = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
                    label = 'Отлично';
                  } else if (r.accuracy >= 55) {
                    badge = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
                    label = 'Хорошо';
                  } else {
                    badge = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
                    label = 'Нужно подтянуть';
                  }
                }

                return (
                  <div
                    key={r.continent}
                    className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white text-sm">{r.continent}</span>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${badge}`}>
                        {label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Верно: {r.correct} из {r.total}</span>
                      <span className="font-mono font-bold text-slate-200">{r.accuracy}%</span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          r.accuracy >= 80
                            ? 'bg-emerald-400'
                            : r.accuracy >= 55
                            ? 'bg-amber-400'
                            : 'bg-rose-400'
                        }`}
                        style={{ width: `${r.total > 0 ? r.accuracy : 0}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Рейтинг: пары, которые ученик знает ХУЖЕ ВСЕГО */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Топ сложных пар (Знает хуже всего):</span>
              </h4>

              {worstPairs.length > 0 && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onTrainWeakPairs(worstPairs.map((w) => w.country));
                    onClose();
                  }}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Тестировать слабые ({worstPairs.length})</span>
                </button>
              )}
            </div>

            {worstPairs.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-800/20 rounded-xl">
                Пока нет накопленных ошибок. Отвечайте на вопросы, и здесь появятся пары, требующие повторения!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {worstPairs.map(({ country, stat }) => (
                  <div
                    key={country.id}
                    className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="truncate">
                        <p className="font-bold text-white truncate">{country.name}</p>
                        <p className="text-[11px] text-amber-400 truncate">
                          Столица: {country.capital}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-rose-400 font-bold font-mono">
                        {stat.wrong} {stat.wrong === 1 ? 'ошибка' : 'ошибок'}
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Точность: {stat.accuracy}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Рейтинг: пары, которые ученик знает ЛУЧШЕ ВСЕГО */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Топ освоенных пар (Знает лучше всего):</span>
            </h4>

            {bestPairs.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-800/20 rounded-xl">
                Отвечайте правильно на вопросы, чтобы сформировать список ваших лучших стран!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {bestPairs.map(({ country, stat }) => (
                  <div
                    key={country.id}
                    className="p-3 rounded-xl bg-slate-800/30 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="truncate">
                        <p className="font-bold text-white truncate">{country.name}</p>
                        <p className="text-[11px] text-emerald-400 truncate">
                          Столица: {country.capital}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-emerald-400 font-bold font-mono">
                        {stat.correct} верно
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono">
                        100% точность
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Подвал аналитики */}
        <div className="px-6 py-3.5 border-t border-slate-800 flex items-center justify-between bg-slate-900/70 shrink-0">
          {worstPairs.length > 0 ? (
            <button
              onClick={() => {
                sound.playClick();
                onLearnWeakPairs();
                onClose();
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Запустить режим обучения по сложным парам</span>
            </button>
          ) : (
            <span className="text-xs text-slate-500">Статистика обновляется после каждого ответа</span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

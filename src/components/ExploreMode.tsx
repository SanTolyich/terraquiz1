import React, { useState, useMemo } from 'react';
import { Country, COUNTRIES } from '../data/countries';
import {
  Compass,
  Search,
  Sparkles,
  MapPin,
  Users,
  Navigation2,
  ChevronRight
} from 'lucide-react';

interface ExploreModeProps {
  currentCountry: Country | null;
  onSelectCountry: (country: Country) => void;
  onStartQuizWithCountry: (country: Country) => void;
  onZoomToCountry: (country: Country) => void;
}

export const ExploreMode: React.FC<ExploreModeProps> = ({
  currentCountry,
  onSelectCountry,
  onStartQuizWithCountry,
  onZoomToCountry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Быстрый поиск страны
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.continent.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery]);

  return (
    <div className="bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-800 p-2.5 sm:p-3 shadow-lg flex flex-col gap-2">
      {/* Верхняя компактная строка: Название режима + поиск */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-200">
            Режим исследования
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            · Наведите на страну на карте, чтобы увидеть её столицу и факт (соседи показаны на карте)
          </span>
        </div>

        {/* Быстрый поиск страны */}
        <div className="relative min-w-[180px] max-w-xs w-full sm:w-auto">
          <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Найти страну или столицу..."
            className="w-full pl-7 pr-2.5 py-1 bg-slate-950/80 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-30 max-h-52 overflow-y-auto">
              {searchResults.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCountry(c);
                    setSearchQuery('');
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-slate-800 flex items-center justify-between text-xs transition-colors border-b border-slate-800/50 last:border-b-0"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{c.flag}</span>
                    <span className="font-semibold text-slate-100">{c.name}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-amber-300">Столица: {c.capital}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Компактная карточка исследуемой страны (БЕЗ лишнего, без списка соседей — они на карте!) */}
      {currentCountry ? (
        <div className="bg-slate-950/80 rounded-lg p-2.5 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          {/* Страна и Столица */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl leading-none">{currentCountry.flag}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-white text-sm sm:text-base leading-tight">
                    {currentCountry.name}
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium border border-slate-700/60">
                    {currentCountry.continent}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">{currentCountry.nameEn}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300 text-[11px]">Столица:</span>
              <span className="font-bold text-amber-300 text-xs sm:text-sm">
                {currentCountry.capital}
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400">
              <Users className="w-3 h-3 text-slate-500" />
              <span>{currentCountry.population}</span>
            </div>
          </div>

          {/* Интересный факт (краткий, по центру) */}
          {currentCountry.trivia && (
            <div className="flex-1 flex items-start gap-1.5 px-2 py-1 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300 text-[11px] leading-relaxed line-clamp-2 md:line-clamp-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-amber-300 font-semibold mr-1">Факт:</strong>
                {currentCountry.trivia}
              </span>
            </div>
          )}

          {/* Кнопки действий */}
          <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
            <button
              onClick={() => onZoomToCountry(currentCountry)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
              title="Приблизить камеру карты к столице"
            >
              <Navigation2 className="w-3 h-3 text-amber-400" />
              <span>Приблизить</span>
            </button>
            <button
              onClick={() => onStartQuizWithCountry(currentCountry)}
              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm shadow-amber-500/20"
            >
              <Sparkles className="w-3 h-3" />
              <span>Тест</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="py-2 text-center text-slate-400 text-xs">
          Наведите курсор на любую страну на карте ниже для мгновенного исследования
        </div>
      )}
    </div>
  );
};

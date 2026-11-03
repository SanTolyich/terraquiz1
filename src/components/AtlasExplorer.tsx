import React, { useState, useMemo } from 'react';
import { Country, COUNTRIES, CONTINENTS, ContinentFilter } from '../data/countries';
import { Search, MapPin, Sparkles, Play, Globe } from 'lucide-react';

interface AtlasExplorerProps {
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
  onStartQuizWithCountry: (country: Country) => void;
  continentFilter: ContinentFilter;
  onContinentChange: (continent: ContinentFilter) => void;
}

export const AtlasExplorer: React.FC<AtlasExplorerProps> = ({
  selectedCountry,
  onSelectCountry,
  onStartQuizWithCountry,
  continentFilter,
  onContinentChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((c) => {
      const matchesContinent = continentFilter === 'Все' || c.continent === continentFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q);
      return matchesContinent && matchesSearch;
    });
  }, [searchQuery, continentFilter]);

  return (
    <div className="w-full flex flex-col gap-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-5 shadow-xl">
      {/* Поиск и фильтр регионов */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск страны или столицы..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400/80 transition-colors"
          />
        </div>

        {/* Вкладки регионов */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {CONTINENTS.map((cont) => (
            <button
              key={cont}
              onClick={() => onContinentChange(cont)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                continentFilter === cont
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cont}
            </button>
          ))}
        </div>
      </div>

      {/* Карточка выбранной страны */}
      {selectedCountry ? (
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-start gap-4">
            <span className="text-4xl drop-shadow-md">{selectedCountry.flag}</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-heading">{selectedCountry.name}</h3>
                <span className="text-xs text-slate-400">({selectedCountry.nameEn})</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Столица: {selectedCountry.capital}</span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">Часть света: {selectedCountry.continent}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">Население: {selectedCountry.population}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 font-mono text-[11px]">
                  Координаты: {selectedCountry.capitalCoords[1].toFixed(2)}° с.ш., {selectedCountry.capitalCoords[0].toFixed(2)}° в.д.
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mt-1 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{selectedCountry.trivia}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onStartQuizWithCountry(selectedCountry)}
              className="flex-1 md:flex-initial px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Тренировать эту страну</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-slate-800/30 border border-slate-800 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>Кликните на любую страну на карте мира или выберите из списка ниже, чтобы изучить её столицу и расположение.</span>
        </div>
      )}

      {/* Список стран для быстрого выбора */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Список стран ({filteredCountries.length})
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-56 overflow-y-auto pr-1">
          {filteredCountries.map((c) => {
            const isSelected = selectedCountry?.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCountry(c)}
                className={`p-2 rounded-xl border text-left text-xs transition-all flex items-center gap-2 truncate ${
                  isSelected
                    ? 'bg-amber-400/20 border-amber-400/80 text-amber-200'
                    : 'bg-slate-800/40 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span className="text-base shrink-0">{c.flag}</span>
                <div className="truncate">
                  <p className="font-semibold truncate">{c.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{c.capital}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

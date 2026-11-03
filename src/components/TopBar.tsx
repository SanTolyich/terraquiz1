import React from 'react';
import { AppMode } from '../utils/stats';
import {
  Settings,
  Volume2,
  VolumeX,
  Compass,
  ArrowRightLeft,
  BookOpen,
  BarChart3,
  Search
} from 'lucide-react';

interface TopBarProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  onOpenSettings: () => void;
  onOpenAnalytics: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentMode,
  onSelectMode,
  onOpenSettings,
  onOpenAnalytics,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="flex items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 py-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shrink-0 select-none">
      {/* Зона 1: Название бренда */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelectMode('DIRECT');
        }}
        className="text-lg font-bold tracking-tight text-slate-100 flex items-center gap-2 whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
      >
        <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-sm font-bold">
          🌍
        </span>
        <span className="font-heading">TerraQuiz</span>
      </a>

      {/* Зона 2: Навигационные режимы */}
      <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-slate-400 overflow-x-auto">
        <button
          onClick={() => onSelectMode('DIRECT')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            currentMode === 'DIRECT' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          <span>Столица → Страна</span>
        </button>

        <button
          onClick={() => onSelectMode('REVERSE')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            currentMode === 'REVERSE' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Страна → Столица</span>
        </button>

        <button
          onClick={() => onSelectMode('LEARNING')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            currentMode === 'LEARNING' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Обучение</span>
        </button>

        <button
          onClick={() => onSelectMode('EXPLORE')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            currentMode === 'EXPLORE' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Исследование</span>
        </button>

        <button
          onClick={() => onSelectMode('ATLAS')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            currentMode === 'ATLAS' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Атлас</span>
        </button>
      </nav>

      {/* Зона 3: Аналитика, настройки и звук */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Включить звук' : 'Выключить звук'}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenAnalytics}
          className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95"
          title="Рейтинг знаний и рекомендации"
        >
          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Аналитика и рейтинг</span>
          <span className="sm:hidden">Рейтинг</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-sm shadow-amber-500/20 active:scale-95"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Настройки</span>
        </button>
      </div>
    </header>
  );
};

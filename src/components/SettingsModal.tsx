import React from 'react';
import { AppSettings, AnswerInputMode, resetScore, ScoreState } from '../utils/stats';
import { CONTINENTS, ContinentFilter } from '../data/countries';
import { Settings, X, Map, Layers, RotateCcw, Check } from 'lucide-react';

interface SettingsModalProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onClose: () => void;
  onResetScore: (newScore: ScoreState) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  onResetScore,
}) => {
  const handleInputModeChange = (mode: AnswerInputMode) => {
    onUpdateSettings({ ...settings, inputMode: mode });
  };

  const handleToggleMap = () => {
    onUpdateSettings({ ...settings, askMapLocation: !settings.askMapLocation });
  };

  const handleContinentChange = (cont: ContinentFilter) => {
    onUpdateSettings({ ...settings, continent: cont });
  };

  const handleResetScores = () => {
    if (confirm('Сбросить счет и статистику вопросов?')) {
      const fresh = resetScore();
      onResetScore(fresh);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Шапка настроек */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-sm font-bold">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">Настройки тестирования</h3>
              <p className="text-xs text-slate-400">Режим ввода ответов, контурная карта и регионы</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Тело настроек */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {/* Способ выбора ответа */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Способ ответа на вопрос:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleInputModeChange('CHOICE_3')}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all flex flex-col gap-1 ${
                  settings.inputMode === 'CHOICE_3'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                    : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">3 варианта</span>
                  {settings.inputMode === 'CHOICE_3' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <span className="text-[11px] text-slate-400">Быстрый выбор</span>
              </button>

              <button
                onClick={() => handleInputModeChange('CHOICE_5')}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all flex flex-col gap-1 ${
                  settings.inputMode === 'CHOICE_5'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                    : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">5 вариантов</span>
                  {settings.inputMode === 'CHOICE_5' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <span className="text-[11px] text-slate-400">Повышенная сложность</span>
              </button>

              <button
                onClick={() => handleInputModeChange('MANUAL')}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all flex flex-col gap-1 ${
                  settings.inputMode === 'MANUAL'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                    : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">Ввод вручную</span>
                  {settings.inputMode === 'MANUAL' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <span className="text-[11px] text-slate-400">С клавиатуры</span>
              </button>
            </div>
          </div>

          {/* Опция контурной карты */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-700/80">
            <div className="flex items-start gap-3">
              <Map className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-white">
                  Просить указать место на контурной карте
                </span>
                <span className="text-xs text-slate-400">
                  После правильного ответа показывать контурную карту мира и просить кликнуть на примерное местоположение страны
                </span>
              </div>
            </div>

            <button
              onClick={handleToggleMap}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                settings.askMapLocation ? 'bg-amber-400' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-slate-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.askMapLocation ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Фильтр региона */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Регион для тренировки:</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CONTINENTS.map((cont) => (
                <button
                  key={cont}
                  onClick={() => handleContinentChange(cont)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    settings.continent === cont
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {cont}
                </button>
              ))}
            </div>
          </div>

          {/* Сброс статистики */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handleResetScores}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сбросить счет и статистику</span>
            </button>
          </div>
        </div>

        {/* Подвал настроек */}
        <div className="px-6 py-3.5 border-t border-slate-800 flex justify-end bg-slate-900/60">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};

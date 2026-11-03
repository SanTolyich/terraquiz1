/**
 * Управление расширенной аналитикой, статистикой по регионам и рейтингом пар страна-столица на русском языке
 */

import { Country, COUNTRIES_BY_ID } from '../data/countries';

export type AppMode = 'DIRECT' | 'REVERSE' | 'LEARNING' | 'EXPLORE' | 'ATLAS';

export type AnswerInputMode = 'CHOICE_3' | 'CHOICE_5' | 'MANUAL';

export interface AppSettings {
  inputMode: AnswerInputMode;
  askMapLocation: boolean;
  continent: string;
  prioritizeWeakPairsInLearning: boolean; // В режиме обучения гонять хуже всего освоенные пары
}

export interface ScoreState {
  totalQuestions: number;
  correctAnswers: number;
  wrongAttempts: number;
  mapAccurateCount: number;
  streak: number;
  bestStreak: number;
}

export interface LearningState {
  learnedIds: string[];
  reviewIds: string[];
}

export interface PairStat {
  countryId: string;
  correct: number;
  wrong: number;
  total: number;
  accuracy: number; // 0-100%
  lastTested: number;
}

export interface RegionStat {
  continent: string;
  total: number;
  correct: number;
  accuracy: number;
  status: 'EXCELLENT' | 'GOOD' | 'NEEDS_WORK'; // 'Отлично' | 'Хорошо' | 'Нужно подтянуть'
}

const SETTINGS_KEY = 'terraquiz_ru_settings_v2';
const STATS_KEY = 'terraquiz_ru_stats_v2';
const LEARNING_KEY = 'terraquiz_ru_learning_v2';
const REGION_STATS_KEY = 'terraquiz_ru_region_stats_v2';
const PAIR_STATS_KEY = 'terraquiz_ru_pair_stats_v2';

export const defaultSettings: AppSettings = {
  inputMode: 'CHOICE_3',
  askMapLocation: true,
  continent: 'Все',
  prioritizeWeakPairsInLearning: true,
};

export const defaultScore: ScoreState = {
  totalQuestions: 0,
  correctAnswers: 0,
  wrongAttempts: 0,
  mapAccurateCount: 0,
  streak: 0,
  bestStreak: 0,
};

export const defaultLearning: LearningState = {
  learnedIds: [],
  reviewIds: [],
};

export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}

export function loadSavedScore(): ScoreState {
  if (typeof window === 'undefined') return defaultScore;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...defaultScore, ...JSON.parse(raw) } : defaultScore;
  } catch {
    return defaultScore;
  }
}

export function saveScore(score: ScoreState) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(score));
  } catch {
    // Ignore
  }
}

export function resetScore(): ScoreState {
  try {
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(REGION_STATS_KEY);
    localStorage.removeItem(PAIR_STATS_KEY);
  } catch {
    // Ignore
  }
  return defaultScore;
}

export function loadLearningState(): LearningState {
  if (typeof window === 'undefined') return defaultLearning;
  try {
    const raw = localStorage.getItem(LEARNING_KEY);
    return raw ? { ...defaultLearning, ...JSON.parse(raw) } : defaultLearning;
  } catch {
    return defaultLearning;
  }
}

export function saveLearningState(learning: LearningState) {
  try {
    localStorage.setItem(LEARNING_KEY, JSON.stringify(learning));
  } catch {
    // Ignore
  }
}

// Загрузка статистики по регионам
export function loadRegionStats(): Record<string, { total: number; correct: number }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(REGION_STATS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Загрузка статистики по парам страна-столица
export function loadPairStats(): Record<string, PairStat> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PAIR_STATS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Запись результата одного ответа
export function recordPairResult(countryId: string, continent: string, isCorrect: boolean) {
  if (typeof window === 'undefined') return;

  // 1. Обновляем статистику по регионам
  const regionStats = loadRegionStats();
  const currentRegion = regionStats[continent] || { total: 0, correct: 0 };
  regionStats[continent] = {
    total: currentRegion.total + 1,
    correct: currentRegion.correct + (isCorrect ? 1 : 0),
  };
  try {
    localStorage.setItem(REGION_STATS_KEY, JSON.stringify(regionStats));
  } catch {
    // Ignore
  }

  // 2. Обновляем статистику по конкретной паре страна-столица
  const pairStats = loadPairStats();
  const currentPair = pairStats[countryId] || {
    countryId,
    correct: 0,
    wrong: 0,
    total: 0,
    accuracy: 0,
    lastTested: 0,
  };

  const newCorrect = currentPair.correct + (isCorrect ? 1 : 0);
  const newWrong = currentPair.wrong + (isCorrect ? 0 : 1);
  const newTotal = currentPair.total + 1;
  const newAccuracy = Math.round((newCorrect / newTotal) * 100);

  pairStats[countryId] = {
    countryId,
    correct: newCorrect,
    wrong: newWrong,
    total: newTotal,
    accuracy: newAccuracy,
    lastTested: Date.now(),
  };

  try {
    localStorage.setItem(PAIR_STATS_KEY, JSON.stringify(pairStats));
  } catch {
    // Ignore
  }
}

// Получение аналитики по регионам с вычислением статуса
export function getAnalyzedRegionStats(): RegionStat[] {
  const raw = loadRegionStats();
  const regions = ['Европа', 'Азия', 'Америка', 'Африка', 'Океания'];

  return regions.map((continent) => {
    const data = raw[continent] || { total: 0, correct: 0 };
    const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

    let status: 'EXCELLENT' | 'GOOD' | 'NEEDS_WORK' = 'NEEDS_WORK';
    if (data.total >= 3) {
      if (accuracy >= 80) status = 'EXCELLENT';
      else if (accuracy >= 55) status = 'GOOD';
      else status = 'NEEDS_WORK';
    } else {
      status = 'NEEDS_WORK';
    }

    return {
      continent,
      total: data.total,
      correct: data.correct,
      accuracy,
      status,
    };
  });
}

// Получение рейтинга пар: худшие и лучшие
export function getPairRanking(): {
  worstPairs: { country: Country; stat: PairStat }[];
  bestPairs: { country: Country; stat: PairStat }[];
} {
  const pairStats = loadPairStats();
  const list = Object.values(pairStats)
    .map((stat) => ({
      country: COUNTRIES_BY_ID[stat.countryId],
      stat,
    }))
    .filter((item): item is { country: Country; stat: PairStat } => !!item.country);

  // Худшие: сортируем по ошибкам (убывание) и точности (возрастание)
  const worst = [...list]
    .filter((item) => item.stat.wrong > 0 || item.stat.accuracy < 70)
    .sort((a, b) => {
      // Больше ошибок -> выше в списке
      if (b.stat.wrong !== a.stat.wrong) return b.stat.wrong - a.stat.wrong;
      return a.stat.accuracy - b.stat.accuracy;
    })
    .slice(0, 8);

  // Лучшие: сортируем по количеству правильных ответов и 100% точности
  const best = [...list]
    .filter((item) => item.stat.correct > 0 && item.stat.accuracy >= 75)
    .sort((a, b) => {
      if (b.stat.correct !== a.stat.correct) return b.stat.correct - a.stat.correct;
      return b.stat.accuracy - a.stat.accuracy;
    })
    .slice(0, 8);

  return { worstPairs: worst, bestPairs: best };
}

// Сортировка пула стран для режима обучения: слабые пары в первую очередь
export function sortCountriesByWeakness(countries: Country[]): Country[] {
  const pairStats = loadPairStats();

  return [...countries].sort((a, b) => {
    const statA = pairStats[a.id];
    const statB = pairStats[b.id];

    // Если по стране есть ошибки, выставляем ее вперед
    const wrongA = statA ? statA.wrong : 0;
    const wrongB = statB ? statB.wrong : 0;
    if (wrongB !== wrongA) return wrongB - wrongA;

    // Если одинаково ошибок, смотрим точность (меньше точность -> раньше)
    const accA = statA && statA.total > 0 ? statA.accuracy : 50;
    const accB = statB && statB.total > 0 ? statB.accuracy : 50;
    if (accA !== accB) return accA - accB;

    // Если обе не тестировались, сохраняем исходный порядок
    return 0;
  });
}

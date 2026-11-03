/**
 * Вычисление соседей 1-го и 2-го порядка (граничащих со страной или с её соседями)
 * на основе TopoJSON топологии и морских/островных смежностей.
 */
import * as topojson from 'topojson-client';
import worldDataRaw from 'world-atlas/countries-110m.json';

// Дополнительные морские/островные связи для стран без сухопутных границ в генерализации 110m
const ISLAND_PROXIMITY_MAP: Record<string, string[]> = {
  '826': ['372', '250', '056', '528', '578', '352'], // Великобритания -> Ирландия, Франция, Бельгия, Нидерланды, Норвегия, Исландия
  '372': ['826', '250'], // Ирландия -> Великобритания, Франция
  '392': ['410', '408', '643', '156', '158'], // Япония -> Южная Корея, КНДР, Россия, Китай, Тайвань
  '036': ['554', '360', '598'], // Австралия -> Новая Зеландия, Индонезия, Папуа-Новая Гвинея
  '554': ['036', '242'], // Новая Зеландия -> Австралия, Фиджи
  '450': ['508', '710', '834'], // Мадагаскар -> Мозамбик, ЮАР, Танзания
  '192': ['840', '044', '332', '388', '484'], // Куба -> США, Багамы, Гаити, Ямайка, Мексика
  '352': ['826', '578', '208'], // Исландия -> Великобритания, Норвегия, Дания
  '144': ['356'], // Шри-Ланка -> Индия
  '608': ['158', '704', '458', '360'], // Филиппины -> Тайвань, Вьетнам, Малайзия, Индонезия
  '196': ['300', '792', '760', '422'], // Кипр -> Греция, Турция, Сирия, Ливан
  '158': ['156', '392', '608'], // Тайвань -> Китай, Япония, Филиппины
  '702': ['458', '360'], // Сингапур -> Малайзия, Индонезия
  '048': ['682', '634'], // Бахрейн -> Саудовская Аравия, Катар
  '470': ['380', '788'], // Мальта -> Италия, Тунис
};

// Структура кэша соседей
interface NeighborsCache {
  directNeighbors: Map<string, Set<string>>;
}

let cachedNeighbors: NeighborsCache | null = null;

function initNeighbors(): NeighborsCache {
  if (cachedNeighbors) return cachedNeighbors;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topology = worldDataRaw as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geometries = topology.objects.countries.geometries as any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const neighborIndices = (topojson as any).neighbors(geometries) as number[][];

  const directMap = new Map<string, Set<string>>();

  // Инициализируем множества для всех стран
  geometries.forEach((g) => {
    if (g.id) {
      const id = String(g.id);
      if (!directMap.has(id)) {
        directMap.set(id, new Set<string>());
      }
    }
  });

  // Заполняем топологические границы
  neighborIndices.forEach((neighbors, i) => {
    const countryA = geometries[i];
    if (!countryA || !countryA.id) return;
    const idA = String(countryA.id);
    const setA = directMap.get(idA) || new Set<string>();

    neighbors.forEach((j) => {
      const countryB = geometries[j];
      if (countryB && countryB.id) {
        const idB = String(countryB.id);
        setA.add(idB);
        const setB = directMap.get(idB) || new Set<string>();
        setB.add(idA);
        directMap.set(idB, setB);
      }
    });

    directMap.set(idA, setA);
  });

  // Добавляем островные и морские связи
  Object.entries(ISLAND_PROXIMITY_MAP).forEach(([idA, neighborIds]) => {
    const setA = directMap.get(idA) || new Set<string>();
    neighborIds.forEach((idB) => {
      setA.add(idB);
      const setB = directMap.get(idB) || new Set<string>();
      setB.add(idA);
      directMap.set(idB, setB);
    });
    directMap.set(idA, setA);
  });

  cachedNeighbors = { directNeighbors: directMap };
  return cachedNeighbors;
}

export interface NeighborResult {
  firstDegree: string[]; // Прямые соседи
  secondDegree: string[]; // Соседи соседей (2-й круг)
  allNeighborIds: Set<string>; // Объединенное множество соседей
}

/**
 * Получить список соседей 1-го и 2-го порядка для заданной страны
 */
export function getCountryNeighbors(countryId: string | null | undefined): NeighborResult {
  if (!countryId) {
    return { firstDegree: [], secondDegree: [], allNeighborIds: new Set() };
  }

  const { directNeighbors } = initNeighbors();
  const firstSet = directNeighbors.get(String(countryId)) || new Set<string>();
  const firstDegree = Array.from(firstSet);

  const secondSet = new Set<string>();
  firstDegree.forEach((nId) => {
    const nNeighbors = directNeighbors.get(nId);
    if (nNeighbors) {
      nNeighbors.forEach((nnId) => {
        if (nnId !== countryId && !firstSet.has(nnId)) {
          secondSet.add(nnId);
        }
      });
    }
  });

  const secondDegree = Array.from(secondSet);
  const allNeighborIds = new Set<string>([...firstDegree, ...secondDegree]);

  return {
    firstDegree,
    secondDegree,
    allNeighborIds,
  };
}

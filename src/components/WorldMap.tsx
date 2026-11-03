import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import * as topojson from 'topojson-client';
import * as d3Geo from 'd3-geo';
import worldDataRaw from 'world-atlas/countries-110m.json';
import { Country, COUNTRIES_BY_ID } from '../data/countries';
import { getCountryNeighbors } from '../utils/neighbors';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Globe2,
  Navigation,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface WorldMapProps {
  selectedCountryId?: string | null;
  targetCountryId?: string | null;
  correctCountryId?: string | null;
  wrongCountryId?: string | null;
  onCountryClick?: (country: Country | null, rawId: string, event: React.MouseEvent) => void;
  onCountryHover?: (country: Country | null, rawId: string) => void;
  showCapitalPin?: boolean;
  pinCountry?: Country | null;
  continentFocus?: string;
  isMapGuessPhase?: boolean; // Режим указания на контурной карте (все подсказки скрыты)
  targetCountryName?: string;
  allowHoverTooltip?: boolean; // Показывать ли всплывающее имя страны при наведении
  isExploreMode?: boolean; // Режим исследования: автоподсветка при наведении мыши
  mapFeedback?: {
    isSuccess: boolean;
    clickedName?: string;
    message: string;
  } | null;
  interactive?: boolean;
  focusTrigger?: number; // Счетчик для принудительного зума к pinCountry
}

const VIEW_BOX_WIDTH = 960;
const VIEW_BOX_HEIGHT = 500;

// Список стран-гигантов, для которых зум должен быть умеренным
const GIANT_COUNTRY_IDS = new Set(['643', '124', '840', '156', '076', '036']);
const LARGE_COUNTRY_IDS = new Set(['032', '398', '356', '360', '484', '012', '180', '404']);

// Региональные пресеты камеры
const REGION_PRESETS: Record<string, { x: number; y: number; zoom: number }> = {
  Все: { x: 0, y: 0, zoom: 1 },
  Европа: { x: -320, y: 140, zoom: 2.7 },
  Азия: { x: -620, y: 50, zoom: 2.2 },
  Африка: { x: -380, y: -120, zoom: 2.1 },
  Америка: { x: 260, y: -50, zoom: 1.8 },
  Океания: { x: -920, y: -340, zoom: 2.4 },
};

export const WorldMap: React.FC<WorldMapProps> = ({
  selectedCountryId,
  targetCountryId,
  correctCountryId,
  wrongCountryId,
  onCountryClick,
  onCountryHover,
  showCapitalPin = false,
  pinCountry,
  continentFocus = 'Все',
  isMapGuessPhase = false,
  targetCountryName,
  allowHoverTooltip = false,
  isExploreMode = false,
  mapFeedback,
  interactive = true,
  focusTrigger = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 960
  );
  const [hoveredCountry, setHoveredCountry] = useState<{
    country: Country | null;
    id: string;
    x: number;
    y: number;
  } | null>(null);

  // Отслеживание реальной ширины контейнера карты для адаптивной четкости шрифтов
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const isMobile = containerWidth < 640;
  // Коэффициент отображения: сколько экранных пикселей приходится на 1 единицу SVG viewBox (960)
  const displayScale = Math.max(0.32, Math.min(1.4, containerWidth / VIEW_BOX_WIDTH));

  // d3-geo проекция Natural Earth
  const projection = useMemo(() => {
    return d3Geo
      .geoNaturalEarth1()
      .scale(153)
      .translate([VIEW_BOX_WIDTH / 2, VIEW_BOX_HEIGHT / 2]);
  }, []);

  const pathGenerator = useMemo(() => {
    return d3Geo.geoPath().projection(projection);
  }, [projection]);

  // Извлечение полигонов из TopoJSON
  const { countriesFeatures, countryBorders, countryCentroids } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldDataRaw as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countries = topojson.feature(topology, topology.objects.countries) as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const borders = topojson.mesh(topology, topology.objects.countries, (a: any, b: any) => a !== b);

    const features = countries.features || [];
    const centroids: Record<string, [number, number]> = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    features.forEach((f: any) => {
      try {
        const c = pathGenerator.centroid(f);
        if (c && !isNaN(c[0]) && !isNaN(c[1])) {
          centroids[String(f.id)] = c;
        }
      } catch {
        // Ignore invalid geometry
      }
    });

    return {
      countriesFeatures: features,
      countryBorders: pathGenerator(borders) || '',
      countryCentroids: centroids,
    };
  }, [pathGenerator]);

  // Фокусировка на континенте
  useEffect(() => {
    if (continentFocus && REGION_PRESETS[continentFocus] && !showCapitalPin && !isExploreMode) {
      const preset = REGION_PRESETS[continentFocus];
      setZoom(preset.zoom);
      setPan({ x: preset.x, y: preset.y });
    }
  }, [continentFocus, showCapitalPin, isExploreMode]);

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.8), 9));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Расчет идеального масштаба: на мобильных устройствах делаем заметно крупнее!
  const calculateIdealZoom = useCallback(
    (countryId: string) => {
      if (GIANT_COUNTRY_IDS.has(countryId)) {
        return isMobile ? 3.4 : 2.6;
      }
      if (LARGE_COUNTRY_IDS.has(countryId)) {
        return isMobile ? 4.6 : 3.6;
      }
      // Обычные и малые страны на мобильном приближаем сильнее, чтобы страна и столица были крупными
      return isMobile ? 6.2 : 4.8;
    },
    [isMobile]
  );

  // Центровка и УКРУПНЕНИЕ по координатам
  const focusOnCoords = useCallback(
    (coords: [number, number], targetZoom: number) => {
      const projected = projection(coords);
      if (!projected) return;
      const [px, py] = projected;
      const centerX = VIEW_BOX_WIDTH / 2;
      const centerY = VIEW_BOX_HEIGHT / 2;
      const newX = (centerX - px) * targetZoom;
      const newY = (centerY - py) * targetZoom;

      setZoom(targetZoom);
      setPan({ x: newX, y: newY });
    },
    [projection]
  );

  // Автозум: в викторине/обучении при показе страны со столицей
  // В режиме исследования — СТРОГО запрещено зумить при наведении!
  useEffect(() => {
    if (isExploreMode) return; // В режиме исследования при наведении НЕ масштабируем!
    if (pinCountry && showCapitalPin && pinCountry.capitalCoords) {
      const idealZoom = calculateIdealZoom(pinCountry.id);
      focusOnCoords(pinCountry.capitalCoords, idealZoom);
    }
  }, [pinCountry, showCapitalPin, isExploreMode, focusOnCoords, calculateIdealZoom]);

  // Принудительный зум в режиме исследования: СТРОГО только по кнопке «Приблизить» или focusTrigger
  useEffect(() => {
    if (focusTrigger > 0 && pinCountry?.capitalCoords) {
      const idealZoom = calculateIdealZoom(pinCountry.id);
      focusOnCoords(pinCountry.capitalCoords, idealZoom);
    }
  }, [focusTrigger, pinCountry, focusOnCoords, calculateIdealZoom]);

  // Перемещение мыши (панорамирование)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Сенсорное управление на мобильных устройствах (тач-панорамирование)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!interactive || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!interactive || !isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Координаты точки столицы
  const effectivePinCountry = isExploreMode
    ? hoveredCountry?.country || pinCountry
    : pinCountry;

  const pinPosition = useMemo(() => {
    if (!effectivePinCountry || (!showCapitalPin && !isExploreMode)) return null;
    const projected = projection(effectivePinCountry.capitalCoords);
    if (!projected) return null;
    return { x: projected[0], y: projected[1] };
  }, [effectivePinCountry, showCapitalPin, isExploreMode, projection]);

  // Показывать ли информацию и названия соседних стран:
  // По умолчанию на контурной карте названий стран НЕТ — только после того, как страна показана!
  const shouldShowNeighborInfo = useMemo(() => {
    if (isMapGuessPhase) return false;
    if (isExploreMode) return Boolean(effectivePinCountry);
    // В викторине — СТРОГО только тогда, когда показана страна и ее столица (после ответа)!
    return Boolean(showCapitalPin && effectivePinCountry);
  }, [isMapGuessPhase, isExploreMode, showCapitalPin, effectivePinCountry]);

  // ОПРЕДЕЛЕНИЕ СОСЕДЕЙ 1-ГО И 2-ГО ПОРЯДКА:
  const neighborSets = useMemo(() => {
    if (!shouldShowNeighborInfo || !effectivePinCountry) {
      return { firstDegree: new Set<string>(), secondDegree: new Set<string>() };
    }

    const { firstDegree, secondDegree } = getCountryNeighbors(effectivePinCountry.id);
    return {
      firstDegree: new Set(firstDegree),
      secondDegree: new Set(secondDegree),
    };
  }, [shouldShowNeighborInfo, effectivePinCountry]);

  // Расчет адаптивных размеров плашки со столицей и страной
  // Гарантирует идеальную читаемость (13.5px / 12px) на любых экранах, включая мобильные!
  const calloutLayout = useMemo(() => {
    if (!effectivePinCountry) {
      return {
        svgWidth: 140 / displayScale,
        svgHeight: 36 / displayScale,
        text1Y: 13 / displayScale,
        text2Y: 26 / displayScale,
        font1: 11 / displayScale,
        font2: 9.5 / displayScale,
        radius: 6 / displayScale,
      };
    }
    const maxLen = Math.max(
      effectivePinCountry.name.length + 3,
      effectivePinCountry.capital.length + 10
    );
    const targetScreenWidth = Math.max(isMobile ? 180 : 140, maxLen * (isMobile ? 9.6 : 8.2));
    const targetScreenHeight = isMobile ? 44 : 34;

    return {
      svgWidth: targetScreenWidth / displayScale,
      svgHeight: targetScreenHeight / displayScale,
      text1Y: (isMobile ? 16.5 : 13) / displayScale,
      text2Y: (isMobile ? 33 : 26) / displayScale,
      font1: (isMobile ? 13.5 : 11.5) / displayScale,
      font2: (isMobile ? 12 : 10) / displayScale,
      radius: (isMobile ? 7 : 5) / displayScale,
    };
  }, [effectivePinCountry, isMobile, displayScale]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[340px] sm:min-h-[400px] bg-slate-950 rounded-2xl border overflow-hidden select-none shadow-xl flex flex-col justify-between transition-colors ${
        isMapGuessPhase
          ? 'border-amber-500/50 shadow-amber-500/10'
          : 'border-slate-800/80'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseLeave={() => {
        handleMouseUp();
        setHoveredCountry(null);
      }}
      style={{ cursor: isDragging ? 'grabbing' : isExploreMode ? 'pointer' : 'crosshair' }}
    >
      {/* Сетка контурной карты */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.25) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Верхняя плашка состояния карты */}
      <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg text-xs text-slate-300">
        <Globe2 className="w-3.5 h-3.5 text-amber-400" />
        <span className="font-semibold text-slate-100">
          {isMapGuessPhase
            ? 'Контурная карта'
            : isExploreMode
            ? 'Инспектор мира'
            : 'Карта мира'}
        </span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-400 font-mono tabular-nums">Масштаб: {zoom.toFixed(1)}x</span>
      </div>

      {/* Баннер задания в режиме поиска на контурной карте */}
      {isMapGuessPhase && (
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20 bg-amber-500/95 text-slate-950 px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 animate-bounce">
          <Navigation className="w-4 h-4 fill-current" />
          <span>Укажите на карте: {targetCountryName}</span>
        </div>
      )}

      {/* Панель подсказки результата поиска на карте */}
      {mapFeedback && (
        <div
          className={`absolute top-14 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2 backdrop-blur-md border animate-in fade-in duration-200 ${
            mapFeedback.isSuccess
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
              : 'bg-rose-950/90 text-rose-200 border-rose-500/50'
          }`}
        >
          {mapFeedback.isSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{mapFeedback.message}</span>
        </div>
      )}

      {/* Кнопки управления масштабом */}
      <div className="absolute top-3.5 right-3.5 z-20 flex flex-col gap-1 bg-slate-900/85 backdrop-blur-md p-1 rounded-xl border border-slate-700/60 shadow-lg">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoom(0.5);
          }}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Приблизить"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoom(-0.5);
          }}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Отдалить"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Сбросить вид"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* SVG Холст */}
      <svg
        viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
        className="w-full h-full flex-1"
        style={{ touchAction: 'none' }}
      >
        <defs>
          <radialGradient id="oceanGlow" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#091124" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        <rect width={VIEW_BOX_WIDTH} height={VIEW_BOX_HEIGHT} fill="url(#oceanGlow)" />

        <g
          transform={`translate(${VIEW_BOX_WIDTH / 2 + pan.x}, ${VIEW_BOX_HEIGHT / 2 + pan.y}) scale(${zoom}) translate(${-VIEW_BOX_WIDTH / 2}, ${-VIEW_BOX_HEIGHT / 2})`}
          className="transition-transform duration-200 ease-out"
        >
          {/* Контуры стран */}
          <g className="countries-layer">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {countriesFeatures.map((feature: any, idx: number) => {
              const countryId = String(feature.id || '');
              const country = COUNTRIES_BY_ID[countryId];
              const pathD = pathGenerator(feature) || '';

              if (!pathD) return null;

              const isTarget = targetCountryId && targetCountryId === countryId;
              const isSelected = selectedCountryId && selectedCountryId === countryId;
              const isCorrect = correctCountryId && correctCountryId === countryId;
              const isWrong = wrongCountryId && wrongCountryId === countryId;
              const isHovered = hoveredCountry?.id === countryId;
              const isEffectiveActive = effectivePinCountry?.id === countryId;

              const isFirstNeighbor = neighborSets.firstDegree.has(countryId);
              const isSecondNeighbor = neighborSets.secondDegree.has(countryId);

              // Базовая темная контурная заливка
              let fillColor = '#141d2e';
              let strokeColor = '#3e4c63';
              let strokeWidth = 0.8 / zoom;

              // Соседи 1-го круга (прямые границы): приятный сине-стальной полутон
              if (isFirstNeighbor && !isTarget && !isCorrect && !isWrong && !isEffectiveActive) {
                fillColor = '#243754';
                strokeColor = '#60a5fa';
                strokeWidth = 1.1 / zoom;
              }
              // Соседи 2-го круга (граничат с соседями): мягкий графитовый полутон
              else if (isSecondNeighbor && !isTarget && !isCorrect && !isWrong && !isEffectiveActive) {
                fillColor = '#1c283c';
                strokeColor = '#4b5563';
                strokeWidth = 0.9 / zoom;
              }

              if (isCorrect) {
                fillColor = '#10b981'; // Зеленый для правильного ответа
                strokeColor = '#34d399';
                strokeWidth = 2.2 / zoom;
              } else if (isWrong) {
                fillColor = '#ef4444'; // Красный для ошибки
                strokeColor = '#f87171';
                strokeWidth = 2.2 / zoom;
              } else if (isTarget || (isExploreMode && isEffectiveActive)) {
                fillColor = '#f59e0b'; // Золотой акцент целевой/исследуемой страны
                strokeColor = '#fbbf24';
                strokeWidth = 2.4 / zoom;
              } else if (isSelected) {
                fillColor = '#38bdf8'; // Небесно-голубой
                strokeColor = '#7dd3fc';
                strokeWidth = 1.8 / zoom;
              } else if (isHovered && !isMapGuessPhase) {
                fillColor = '#2d3e58';
                strokeColor = '#38bdf8';
                strokeWidth = 1.6 / zoom;
              }

              return (
                <path
                  key={`${countryId}-${idx}`}
                  d={pathD}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className="country-path"
                  onMouseEnter={(e) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    const cObj = country || null;
                    if (rect) {
                      setHoveredCountry({
                        country: cObj,
                        id: countryId,
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                    }
                    if (onCountryHover) {
                      onCountryHover(cObj, countryId);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredCountry(null);
                  }}
                  onClick={(e) => {
                    if (isDragging) return;
                    e.stopPropagation();
                    if (isExploreMode && country?.capitalCoords) {
                      // В режиме исследования масштабируем ровно один раз по клику на контуре страны!
                      const idealZoom = calculateIdealZoom(country.id);
                      focusOnCoords(country.capitalCoords, idealZoom);
                    }
                    if (onCountryClick) {
                      onCountryClick(country || null, countryId, e);
                    }
                  }}
                  style={{
                    filter:
                      isCorrect || isTarget || (isExploreMode && isEffectiveActive)
                        ? 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))'
                        : undefined,
                  }}
                />
              );
            })}
          </g>

          {/* Межгосударственные границы */}
          {countryBorders && (
            <path
              d={countryBorders}
              fill="none"
              stroke="#64748b"
              strokeWidth={0.8 / zoom}
              strokeOpacity={0.7}
              className="pointer-events-none"
            />
          )}

          {/* 1. НАДПИСИ СОСЕДНИХ СТРАН: отображаются ТОЛЬКО после того, как показана страна! */}
          {shouldShowNeighborInfo && (
            <g className="neighbor-labels pointer-events-none">
              {Array.from(neighborSets.firstDegree)
                .concat(Array.from(neighborSets.secondDegree))
                .map((neighborId) => {
                  const centroid = countryCentroids[neighborId];
                  const c = COUNTRIES_BY_ID[neighborId];
                  if (!centroid || !c) return null;
                  if (effectivePinCountry && effectivePinCountry.id === neighborId) return null;

                  const is1st = neighborSets.firstDegree.has(neighborId);
                  // Адаптивный масштаб для идеальной читаемости на мобильных устройствах
                  const targetFontSize = is1st ? (isMobile ? 12 : 9.8) : (isMobile ? 10 : 8.2);
                  const fontSize = (targetFontSize / displayScale) / zoom;
                  const strokeWidth = ((isMobile ? 2.6 : 1.8) / displayScale) / zoom;

                  return (
                    <text
                      key={`neighbor-label-${neighborId}`}
                      x={centroid[0]}
                      y={centroid[1]}
                      textAnchor="middle"
                      fill={is1st ? '#ffffff' : '#94a3b8'}
                      stroke="#020617"
                      strokeWidth={strokeWidth}
                      paintOrder="stroke fill"
                      fontSize={fontSize}
                      fontWeight={is1st ? '700' : '600'}
                      fontFamily="'Outfit', system-ui, sans-serif"
                      className="select-none"
                    >
                      {c.name}
                    </text>
                  );
                })}
            </g>
          )}

          {/* 2. АККУРАТНАЯ ТОЧКА СТОЛИЦЫ, СТРЕЛКА И КРУПНАЯ ЧЁТКАЯ ТАБЛИЧКА С НАЗВАНИЕМ СТРАНЫ И СТОЛИЦЫ */}
          {pinPosition && effectivePinCountry && !isMapGuessPhase && (
            <g
              transform={`translate(${pinPosition.x}, ${pinPosition.y})`}
              className="pointer-events-none"
            >
              {/* Пульсирующий внешний радарный круг */}
              <circle
                r={((isMobile ? 26 : 20) / displayScale) / zoom}
                fill="none"
                stroke="#38bdf8"
                strokeWidth={((isMobile ? 2.2 : 1.8) / displayScale) / zoom}
                strokeOpacity={0.65}
                className="animate-ping"
              />

              {/* Золотистый ореол точки */}
              <circle
                r={((isMobile ? 13 : 10) / displayScale) / zoom}
                fill="#f59e0b"
                fillOpacity={0.4}
                stroke="#f59e0b"
                strokeWidth={((isMobile ? 2.2 : 1.8) / displayScale) / zoom}
              />

              {/* ТОЧКА СТОЛИЦЫ */}
              <circle
                r={((isMobile ? 6.5 : 5) / displayScale) / zoom}
                fill="#ffffff"
                stroke="#d97706"
                strokeWidth={((isMobile ? 2.6 : 2.2) / displayScale) / zoom}
              />

              {/* СТРЕЛКА, УКАЗЫВАЮЩАЯ НА ТОЧКУ СТОЛИЦЫ */}
              <g transform={`translate(0, ${-((isMobile ? 8 : 6) / displayScale) / zoom})`}>
                <polygon
                  points={`0,0 ${-((isMobile ? 5 : 4) / displayScale) / zoom},${-((isMobile ? 9 : 8) / displayScale) / zoom} ${((isMobile ? 5 : 4) / displayScale) / zoom},${-((isMobile ? 9 : 8) / displayScale) / zoom}`}
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth={((isMobile ? 1 : 0.8) / displayScale) / zoom}
                />
                <line
                  x1={0}
                  y1={-((isMobile ? 8 : 7) / displayScale) / zoom}
                  x2={0}
                  y2={-((isMobile ? 17 : 14) / displayScale) / zoom}
                  stroke="#f59e0b"
                  strokeWidth={((isMobile ? 2.6 : 2.2) / displayScale) / zoom}
                  strokeLinecap="round"
                />
              </g>

              {/* ЧЁТКАЯ ЧИТАЕМАЯ ТАБЛИЧКА С НАЗВАНИЕМ СТРАНЫ И СТОЛИЦЫ (гарантирует читаемость на смартфонах) */}
              <g
                transform={`translate(0, ${
                  -((isMobile ? 20 : 16) / displayScale) / zoom - calloutLayout.svgHeight / zoom
                })`}
              >
                <rect
                  x={(-calloutLayout.svgWidth / 2) / zoom}
                  y={0}
                  width={calloutLayout.svgWidth / zoom}
                  height={calloutLayout.svgHeight / zoom}
                  rx={calloutLayout.radius / zoom}
                  fill="#030712"
                  stroke="#f59e0b"
                  strokeWidth={((isMobile ? 1.6 : 1.2) / displayScale) / zoom}
                  fillOpacity={0.97}
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.85))' }}
                />

                {/* Строка 1: Флаг и Название страны */}
                <text
                  textAnchor="middle"
                  x={0}
                  y={calloutLayout.text1Y / zoom}
                  fill="#ffffff"
                  fontSize={calloutLayout.font1 / zoom}
                  fontWeight="700"
                  fontFamily="'Outfit', system-ui, sans-serif"
                >
                  {effectivePinCountry.flag} {effectivePinCountry.name}
                </text>

                {/* Строка 2: Название столицы */}
                <text
                  textAnchor="middle"
                  x={0}
                  y={calloutLayout.text2Y / zoom}
                  fill="#fbbf24"
                  fontSize={calloutLayout.font2 / zoom}
                  fontWeight="700"
                  fontFamily="'Outfit', system-ui, sans-serif"
                >
                  📍 Столица: {effectivePinCountry.capital}
                </text>
              </g>
            </g>
          )}
        </g>
      </svg>

      {/* Всплывающая подсказка при наведении (только в Атласе, если не в режиме исследования) */}
      {hoveredCountry && allowHoverTooltip && !isMapGuessPhase && !isExploreMode && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-2xl text-slate-100 flex flex-col gap-0.5 text-xs transition-opacity duration-150"
          style={{
            left: Math.max(100, Math.min(hoveredCountry.x, (containerRef.current?.clientWidth || 500) - 100)),
            top: Math.max(70, hoveredCountry.y - 12),
          }}
        >
          {hoveredCountry.country ? (
            <>
              <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                <span className="text-base leading-none">{hoveredCountry.country.flag}</span>
                <span>{hoveredCountry.country.name}</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <span className="text-slate-300 font-medium">Столица:</span>
                <span>{hoveredCountry.country.capital}</span>
                <span className="text-slate-600">·</span>
                <span>{hoveredCountry.country.continent}</span>
              </div>
            </>
          ) : (
            <span className="text-slate-400">Регион (ID: {hoveredCountry.id})</span>
          )}
        </div>
      )}

      {/* Нижняя легенда */}
      <div className="relative z-20 px-3.5 py-2 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="text-slate-300">Страна и столица (стрелка)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
            <span className="text-slate-300">Соседи (1-й и 2-й круг)</span>
          </div>
          {isMapGuessPhase && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse inline-block" />
              <span className="text-amber-300 font-medium">Режим контурного поиска</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {isMapGuessPhase
              ? 'Кликните на контурную карту, где находится страна'
              : isExploreMode
              ? 'Наведите на страну для мгновенного исследования · Кнопки «+ / −» — масштаб'
              : 'Клик — выбор · Перетаскивание — панорама · Кнопки «+ / −» — масштаб'}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Stock Chart Component
 * Interactive chart with news markers using Chart.js
 */

import { useRef, useCallback, useMemo, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';
import type { StockPrice, NewsItem, FairValueDataPoint } from '@/shared/types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  annotationPlugin,
  zoomPlugin
);

interface StockChartProps {
  prices: StockPrice[];
  news: NewsItem[];
  currency?: string;
  onNewsClick?: (newsId: number) => void;
  highlightedNewsId?: number | null;
  fairValueData?: FairValueDataPoint[];
}

export const StockChart: React.FC<StockChartProps> = ({
  prices,
  news,
  currency: _currency = 'USD',
  onNewsClick,
  highlightedNewsId,
  fairValueData,
}) => {
  const chartRef = useRef<ChartJS<'line'>>(null);
  // Use ref instead of state to avoid re-renders that reset zoom
  const hoveredNewsIdRef = useRef<number | null>(null);
  const highlightedNewsIdRef = useRef<number | null>(highlightedNewsId ?? null);
  const prevHighlightedIdRef = useRef<number | null>(null);


  // Base and enlarged sizes
  const baseSize = 24;
  const baseFontSize = 12;
  const basePadding = 6;
  const scale = 1.3; // 130%

  // Function to update annotation size directly without re-render
  const updateAnnotationSize = useCallback((newsId: number, enlarged: boolean) => {
    const chart = chartRef.current;
    if (!chart) return;

    const annotationKey = `news${newsId}`;
    const annotation = (chart.options.plugins?.annotation as any)?.annotations?.[annotationKey];
    if (!annotation) return;

    const newSize = enlarged ? baseSize * scale : baseSize;
    const newFontSize = enlarged ? baseFontSize * scale : baseFontSize;
    const newPadding = enlarged ? basePadding * scale : basePadding;

    annotation.width = newSize;
    annotation.height = newSize;
    annotation.padding = newPadding;
    annotation.font = { size: newFontSize, weight: 'bold' };
    annotation.borderWidth = enlarged ? 3 : 2;
    annotation.borderColor = enlarged ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.8)';

    chart.update('none'); // Update without animation to preserve zoom
  }, []);

  // Keep ref in sync with prop (used in memoized handlers)
  useEffect(() => {
    highlightedNewsIdRef.current = highlightedNewsId ?? null;
  }, [highlightedNewsId]);

  // Handle highlight changes imperatively - no chart options rebuild, no zoom reset
  useEffect(() => {
    if (prevHighlightedIdRef.current !== null) {
      updateAnnotationSize(prevHighlightedIdRef.current, false);
    }
    if (highlightedNewsId != null) {
      updateAnnotationSize(highlightedNewsId, true);
    }
    prevHighlightedIdRef.current = highlightedNewsId ?? null;
  }, [highlightedNewsId, updateAnnotationSize]);

  // Create news annotations (markers on chart) - memoized, no highlightedNewsId dependency
  const newsAnnotations = useMemo(() => {
  const annotations: Record<string, any> = {};

  news.forEach((newsItem, index) => {
    // Find nearest price date for this news
    const newsDate = new Date(newsItem.newsDate);
    const nearestPrice = prices.reduce((prev, curr) => {
      const prevDiff = Math.abs(new Date(prev.date).getTime() - newsDate.getTime());
      const currDiff = Math.abs(new Date(curr.date).getTime() - newsDate.getTime());
      return currDiff < prevDiff ? curr : prev;
    });

    const isPositive = newsItem.sentiment > 0;
    const color = isPositive ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)';

    annotations[`news${newsItem.id}`] = {
      type: 'label',
      xValue: nearestPrice.date,
      yValue: nearestPrice.close,
      backgroundColor: color,
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 2,
      borderRadius: 50,
      color: '#fff',
      content: (index + 1).toString(),
      font: {
        size: baseFontSize,
        weight: 'bold',
      },
      padding: basePadding,
      width: baseSize,
      height: baseSize,
      hitRadius: baseSize * 0.75,
      enter: () => {
        if (chartRef.current?.canvas) {
          chartRef.current.canvas.style.cursor = 'pointer';
        }
        if (highlightedNewsIdRef.current !== newsItem.id) {
          hoveredNewsIdRef.current = newsItem.id;
          updateAnnotationSize(newsItem.id, true);
        }
      },
      leave: () => {
        if (chartRef.current?.canvas) {
          chartRef.current.canvas.style.cursor = 'default';
        }
        if (highlightedNewsIdRef.current !== newsItem.id) {
          hoveredNewsIdRef.current = null;
          updateAnnotationSize(newsItem.id, false);
        }
      },
      click: () => {
        onNewsClick?.(newsItem.id);
      },
    };
  });

  return annotations;
  }, [news, prices, updateAnnotationSize, onNewsClick]);

  const chartData = useMemo(() => {
    const datasets: any[] = [
      {
        label: 'Schlusskurs',
        data: prices.map((p) => p.close),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHitRadius: 10,
      },
    ];

    // Add Fair Value dataset if data is available
    if (fairValueData && fairValueData.length > 0 && prices.length > 0) {
      const firstPriceDate = new Date(prices[0].date);
      const lastPriceDate = new Date(prices[prices.length - 1].date);

      // Get all valid fair value data points (no date filter — we handle range via extension)
      const validFvData = fairValueData.filter((fv) => fv.fairValueCombined != null);

      // Find the fair value points that fall within or closest to the visible price range
      // Include points within range AND the nearest point before/after for proper interpolation
      const fvInRange = validFvData.filter((fv) => {
        const fvDate = new Date(fv.date);
        return fvDate >= firstPriceDate && fvDate <= lastPriceDate;
      });

      // Also include the closest point before the range (for backward extension reference)
      const fvBeforeRange = validFvData
        .filter((fv) => new Date(fv.date) < firstPriceDate)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Also include points slightly after the range (current fair value at today's date)
      const fvAfterRange = validFvData
        .filter((fv) => new Date(fv.date) > lastPriceDate)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Merge: all in-range + first after-range (today's current fair value)
      const relevantFv = [
        ...fvInRange,
        ...(fvAfterRange.length > 0 ? [fvAfterRange[0]] : []),
      ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      if (relevantFv.length > 0) {
        // Build the chart points from relevant fair value data
        const fairValuePoints = relevantFv.map((fv) => ({
          x: fv.date,
          y: fv.fairValueCombined as number,
          isExtension: false,
          fiscalYear: fv.fiscalYear,
        }));

        // Extend backward: add a point at the first stock price date
        // using the earliest available fair value (flat extrapolation)
        const firstFvDate = new Date(fairValuePoints[0].x);
        if (firstFvDate > firstPriceDate) {
          // Use the closest point before range if available, otherwise use first in-range value
          const backValue = fvBeforeRange.length > 0
            ? fvBeforeRange[0].fairValueCombined as number
            : fairValuePoints[0].y;
          const backFY = fvBeforeRange.length > 0
            ? fvBeforeRange[0].fiscalYear
            : fairValuePoints[0].fiscalYear;
          fairValuePoints.unshift({
            x: prices[0].date,
            y: backValue,
            isExtension: true,
            fiscalYear: backFY,
          });
        }

        // Extend forward: add a point at the last stock price date
        // using the latest fair value (flat extrapolation to today)
        const lastFvDate = new Date(fairValuePoints[fairValuePoints.length - 1].x);
        if (lastFvDate < lastPriceDate) {
          fairValuePoints.push({
            x: prices[prices.length - 1].date,
            y: fairValuePoints[fairValuePoints.length - 1].y,
            isExtension: true,
            fiscalYear: fairValuePoints[fairValuePoints.length - 1].fiscalYear,
          });
        }

        datasets.push({
          label: 'Fair Value (berechnet)',
          data: fairValuePoints.map((p) => ({ x: p.x, y: p.y })),
          borderColor: 'rgba(139, 92, 246, 1)',          // Purple
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          borderWidth: 2,
          borderDash: [8, 4],                              // Dashed line
          fill: false,
          tension: 0.3,                                    // Slight curve between annual points
          pointRadius: fairValuePoints.map((p) => p.isExtension ? 0 : 6),
          pointHoverRadius: fairValuePoints.map((p) => p.isExtension ? 4 : 8),
          pointBackgroundColor: 'rgba(139, 92, 246, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointStyle: 'rectRot',                           // Diamond markers
          spanGaps: true,
        });
      }
    }

    return {
      labels: prices.map((p) => p.date),
      datasets,
    };
  }, [prices, fairValueData]);

  const chartOptions: any = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: true,
      axis: 'xy',
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#1f2937',
          font: { size: 14 },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(139, 92, 246, 0.5)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        displayColors: true,
        callbacks: {
          title: (items: any[]) => {
            if (!items.length) return '';
            const raw = items[0].raw;
            // For {x, y} format (fair value), format the date
            if (raw && typeof raw === 'object' && raw.x) {
              return new Date(raw.x).toLocaleDateString('de-DE', {
                day: '2-digit', month: '2-digit', year: 'numeric'
              });
            }
            // For regular labels (stock price)
            const label = items[0].label;
            if (label) {
              return new Date(label).toLocaleDateString('de-DE', {
                day: '2-digit', month: '2-digit', year: 'numeric'
              });
            }
            return '';
          },
          label: (item: any) => {
            const value = item.raw?.y ?? item.raw;
            if (value == null) return '';
            const label = item.dataset.label || '';
            return ` ${label}: ${Number(value).toFixed(2)}`;
          },
        },
      },
      annotation: {
        annotations: newsAnnotations,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'dd.MM.yyyy',
          },
        },
        ticks: {
          color: '#6b7280',
          maxRotation: 45,
          minRotation: 45,
          padding: 10,
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#6b7280',
          callback: (value: any) => value.toFixed(2),
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
    },
    layout: {
      padding: {
        bottom: 15,
      },
    },
  }), [newsAnnotations]);

  return (
    <div className="w-full h-[400px]">
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

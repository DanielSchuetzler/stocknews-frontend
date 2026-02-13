/**
 * Stock Chart Component
 * Interactive chart with news markers using Chart.js
 */

import { useRef, useCallback } from 'react';
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
import type { StockPrice, NewsItem } from '@/shared/types';

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
}

export const StockChart: React.FC<StockChartProps> = ({
  prices,
  news,
  currency: _currency = 'USD',
  onNewsClick,
  highlightedNewsId,
}) => {
  const chartRef = useRef<ChartJS<'line'>>(null);
  // Use ref instead of state to avoid re-renders that reset zoom
  const hoveredNewsIdRef = useRef<number | null>(null);

  // Prepare chart data
  const dates = prices.map((p) => p.date);
  const closePrices = prices.map((p) => p.close);

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

  // Create news annotations (markers on chart)
  const newsAnnotations: Record<string, any> = {};

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

    // Only check highlightedNewsId for initial render (clicked state from parent)
    const isHighlighted = highlightedNewsId === newsItem.id;
    const currentSize = isHighlighted ? baseSize * scale : baseSize;
    const currentFontSize = isHighlighted ? baseFontSize * scale : baseFontSize;
    const currentPadding = isHighlighted ? basePadding * scale : basePadding;

    newsAnnotations[`news${newsItem.id}`] = {
      type: 'label',
      xValue: nearestPrice.date,
      yValue: nearestPrice.close,
      backgroundColor: color,
      borderColor: isHighlighted ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.8)',
      borderWidth: isHighlighted ? 3 : 2,
      borderRadius: 50,
      color: '#fff',
      content: (index + 1).toString(),
      font: {
        size: currentFontSize,
        weight: 'bold',
      },
      padding: currentPadding,
      width: currentSize,
      height: currentSize,
      // Limit hover detection area to ~50% around the dot (radius + 50%)
      hitRadius: currentSize * 0.75, // 50% extra around the dot
      // Hover handlers - update directly without React state
      enter: () => {
        if (chartRef.current?.canvas) {
          chartRef.current.canvas.style.cursor = 'pointer';
        }
        // Only enlarge if not already highlighted
        if (highlightedNewsId !== newsItem.id) {
          hoveredNewsIdRef.current = newsItem.id;
          updateAnnotationSize(newsItem.id, true);
        }
      },
      leave: () => {
        if (chartRef.current?.canvas) {
          chartRef.current.canvas.style.cursor = 'default';
        }
        // Only shrink if not highlighted
        if (highlightedNewsId !== newsItem.id) {
          hoveredNewsIdRef.current = null;
          updateAnnotationSize(newsItem.id, false);
        }
      },
      click: () => {
        onNewsClick?.(newsItem.id);
      },
    };
  });

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Schlusskurs',
        data: closePrices,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 0, // Disabled to prioritize news dots
      },
    ],
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
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
        enabled: false, // Disabled to prioritize news dots interaction
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
  };

  return (
    <div className="w-full h-[500px]">
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

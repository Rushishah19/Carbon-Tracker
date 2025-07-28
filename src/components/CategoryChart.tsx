import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { getCategoryColor, formatCarbonAmount } from '../utils/calculations';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  data: {
    transportation: number;
    energy: number;
    food: number;
    waste: number;
    consumption: number;
  };
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const categories = Object.keys(data) as Array<keyof typeof data>;
  const values = categories.map(cat => data[cat]);
  const total = values.reduce((sum, val) => sum + val, 0);

  const chartData = {
    labels: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
    datasets: [
      {
        data: values,
        backgroundColor: categories.map(cat => getCategoryColor(cat)),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBorderWidth: 3
      }
    ]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw as number;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${formatCarbonAmount(value)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%'
  };

  return (
    <div className="relative h-80">
      <Doughnut data={chartData} options={options} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{formatCarbonAmount(total)}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
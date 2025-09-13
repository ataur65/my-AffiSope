'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

const WeeklyRecapChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy existing chart instance if it exists
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Revenue',
              data: [4500, 4800, 5200, 4900, 5300, 5500, 5800],
              backgroundColor: 'rgba(138, 116, 249, 0.2)',
              borderColor: '#8a74f9',
              borderWidth: 2,
              pointBackgroundColor: '#8a74f9',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#8a74f9',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                grid: {
                  color: '#4a4e74'
                },
                ticks: {
                  color: '#a0a0b0'
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#a0a0b0'
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup chart on component unmount
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="bg-custom-surface p-6 rounded-lg mt-8">
      <h3 className="text-xl font-semibold text-white">Weekly Recap</h3>
      <div className="mt-4 h-64">
        <canvas id="recapChart" ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default WeeklyRecapChart;
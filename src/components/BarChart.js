import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ labels, data, label, backgroundColor, borderColor, borderWidth }) => {
  const chartRef = useRef(null);
  let chart = null;

  useEffect(() => {
    if (chartRef.current) {
      chart = new Chart(chartRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label,
              data,
              backgroundColor,
              borderColor,
              borderWidth
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [labels, data, label, backgroundColor, borderColor, borderWidth]);

  return <canvas id={labels} ref={chartRef} />;
};

export default BarChart;

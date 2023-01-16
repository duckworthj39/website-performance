import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ labels, data, label, backgroundColor, borderColor, borderWidth, title }) => {
  const chartRef = useRef(null);
  let chart = null;

  // When a side effect occurs re render the graphs with the new data
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
          },
          plugins: {
            title: {
              display: true,
              text: title
            }
          }
        }
      });
    }
    return () => {
      // Clean up charts so chart.js can re render them
      if (chart) {
        chart.destroy();
      }
    };
  }, [labels, data, label, backgroundColor, borderColor, borderWidth]);

  return <canvas id={labels} ref={chartRef} />;
};

export default BarChart;

import React, {useEffect, useState} from "react";
import Chart from 'chart.js/auto'

function WebsiteData({url}) {
  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    async function fetchData(url) {
      debugger;
      const response = fetch(`http://localhost:3001/api/pagespeed?url=${url}`)
        .then(res => res.json())
        .then(data => setData(data))
    }

    fetchData(url);
  }, [url]);

  useEffect(() => {
    if (data) {
      const ctx = document.getElementById('chart').getContext('2d');
      setChart(new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['First Contentful Paint', 'Speed Index', 'Time to Interactive'],
          datasets: [{
            label: 'Value',
            data: [
              data.lighthouseResult.audits['first-contentful-paint'].displayValue,
              data.lighthouseResult.audits['speed-index'].displayValue,
              data.lighthouseResult.audits['interactive'].displayValue
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }));
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <canvas id="chart"></canvas>
    </div>
  );
}

export default function App() {
  const [url, setUrl] = useState('https://amazon.com');

  return (
    <div>
      <form>
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
        </label>
      </form>
      <WebsiteData url={url}/>
    </div>
  );
}

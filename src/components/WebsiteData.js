import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';

const WebsiteCharts = () => {
  const [chartData, setChartData] = useState([]);
  const [amazonData, setAmazonData] = useState([]);
  const [bestBuyData, setBestBuyData] = useState({});
  const [targetData, setTargetData] = useState({});
  const [walmartData, setWalmartData] = useState({});

  useEffect(() => {
    // Fetch data from your Express endpoint
    debugger
    fetch(`http://localhost:3001/api/pagespeed`)
      .then(response => response.json())
      .then(data => {
        debugger;
        // setChartData(data);
        setAmazonData(data.find(function(item) { return item.site === 'https://www.amazon.com'; }));
        setBestBuyData(data.find(function(item) { return item.site === 'https://www.bestbuy.com'; }));
        setTargetData(data.find(function(item) { return item.site === 'https://www.target.com'; }));
        setWalmartData(data.find(function(item) { return item.site === 'https://www.walmart.com'; }));
        debugger
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <BarChart
        labels={['Amazon', 'Walmart']}
        data={[amazonData.speedScore, walmartData.speedScore]}
        label='Performance Walmart'
        backgroundColor='rgba(255, 99, 132, 0.2)'
        borderColor='rgba(255, 99, 132, 1)'
        borderWidth={1}
      />
      <BarChart
        labels={['Amazon', 'Bestbuy']}
        data={[amazonData.speedScore, bestBuyData.speedScore]}
        label='Performance Best Buy'
        backgroundColor='rgba(54, 162, 235, 0.2)'
        borderColor='rgba(54, 162, 235, 1)'
        borderWidth={1}
      />
      <BarChart
        labels={['Amazon', 'Target']}
        data={[amazonData.speedScore, targetData.speedScore]}
        label='Performance Target'
        backgroundColor='rgba(255, 206, 86, 0.2)'
        borderColor='rgba(255, 206, 86, 1)'
        borderWidth={1}
      />
    </>
  );
};
export default WebsiteCharts;

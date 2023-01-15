import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import LoadingSpinner from './LoadingSpinner';

const WebsiteData = () => {
  const [amazonData, setAmazonData] = useState({});
  const [bestBuyData, setBestBuyData] = useState({});
  const [targetData, setTargetData] = useState({});
  const [walmartData, setWalmartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the express endpoint
    // In a normal app you would configure the endpoint using env vars or a config file
    fetch(`http://localhost:3001/api/pagespeed`)
      .then((response) => response.json())
      .then((data) => {
        // Find each sites data and set it to state
        setAmazonData(
          data.find(function (item) {
            return item.site === 'https://www.amazon.com';
          })
        );
        setBestBuyData(
          data.find(function (item) {
            return item.site === 'https://www.bestbuy.com';
          })
        );
        setTargetData(
          data.find(function (item) {
            return item.site === 'https://www.target.com';
          })
        );
        setWalmartData(
          data.find(function (item) {
            return item.site === 'https://www.walmart.com';
          })
        );
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <BarChart
        labels={['Amazon', 'Walmart']}
        data={[amazonData.speedScore, walmartData.speedScore]}
        label="Performance Walmart"
        backgroundColor="rgba(255, 99, 132, 0.2)"
        borderColor="rgba(255, 99, 132, 1)"
        borderWidth={1}
      />
      <BarChart
        labels={['Amazon', 'BestBuy']}
        data={[amazonData.speedScore, bestBuyData.speedScore]}
        label="Performance Best Buy"
        backgroundColor="rgba(54, 162, 235, 0.2)"
        borderColor="rgba(54, 162, 235, 1)"
        borderWidth={1}
      />
      <BarChart
        labels={['Amazon', 'Target']}
        data={[amazonData.speedScore, targetData.speedScore]}
        label="Performance Target"
        backgroundColor="rgba(255, 206, 86, 0.2)"
        borderColor="rgba(255, 206, 86, 1)"
        borderWidth={1}
      />
    </div>
  );
};
export default WebsiteData;

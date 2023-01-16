import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';
import LoadingSpinner from './LoadingSpinner';

const WebsiteData = () => {
  const [pageSpeedData, setPageSpeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the express endpoint
    // In a normal app you would configure the endpoint using env vars or a config file
    // I would usually use axios for this type of call since it allows us greater configuration such as setting headers
    fetch(`http://localhost:3001/api/pagespeed`)
      .then((response) => response.json())
      .then((data) => {
        setPageSpeedData(data);
        setIsLoading(false);
      })
      // Ideally if we caught an error we would display an error component to the user and log the error to a proper
      // logging service such as Sentry
      .catch((error) => console.log(error));
  }, []);

  // The API call can be very slow, so we want to display to the user something is happening,
  // and they are waiting for something to load
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
        labels={pageSpeedData.map((p) => p.site)}
        data={pageSpeedData.map((p) => p.speedScore)}
        label="Speed Scores"
        backgroundColor="rgba(255, 99, 132, 0.2)"
        borderColor="rgba(255, 99, 132, 1)"
        borderWidth={1}
        title=" Performance - Speed Scores"
      />
      <br />
      <BarChart
        labels={pageSpeedData.map((p) => p.site)}
        data={pageSpeedData.map((p) => p.firstContentfulPaint)}
        label="First Contentful Paint (s) - When the first user friendly content is displayed"
        backgroundColor="rgba(54, 162, 235, 0.2)"
        borderColor="rgba(54, 162, 235, 1)"
        borderWidth={1}
        title="Performance - First Contentful Paint"
      />
      <br />
      <BarChart
        labels={pageSpeedData.map((p) => p.site)}
        data={pageSpeedData.map((p) => p.timeToInteractive)}
        label="Time To Interactive (s) - When the page is fully interactive"
        backgroundColor="rgba(195, 255, 104, 0.2)"
        borderColor="rgba(195, 255, 104, 1)"
        borderWidth={1}
        title="Performance - Time To Interactive"
      />
    </div>
  );
};
export default WebsiteData;

import React from 'react';
import { act, render } from '@testing-library/react';
import WebsiteData from './WebsiteData';
import mockBarChart from './BarChart';

jest.mock('./BarChart', () => jest.fn());

describe('WebsiteCharts', () => {
  const mockData = [
    { site: 'https://www.amazon.com', speedScore: 0.9 },
    { site: 'https://www.bestbuy.com', speedScore: 0.8 },
    { site: 'https://www.target.com', speedScore: 0.7 },
    { site: 'https://www.walmart.com', speedScore: 0.6 }
  ];

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });
  });

  beforeEach(() => {
    jest.resetModules();
    jest.mock('./BarChart', () => mockBarChart);
  });

  afterEach(() => {
    jest.unmock('./BarChart');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the loading spinner when the data is loading', () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Something went wrong'));
    const { getByTestId } = render(<WebsiteData />);
    const loadingSpinner = getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should render the BarChart components after the data is loaded', async () => {
    await act(async () => {
      render(<WebsiteData />);
    });
    expect(mockBarChart).toHaveBeenCalledTimes(3);
  });
});

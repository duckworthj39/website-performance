import './App.css';
import WebsiteData from './components/WebsiteData';

function App() {
  return (
    <div className="text-center container">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Amazon vs Competitors
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        This app displays the page speed performance of Amazon vs its competitors. The data is
        pulled from Google lighthouse. The data is displayed in seconds. The lower the number the
        better the performance.
      </p>
      {/*This is the main component for handling the website data and charts*/}
      <WebsiteData />
    </div>
  );
}

export default App;

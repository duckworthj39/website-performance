import './App.css';
import {useState} from 'react';
import WebsiteData from './components/WebsiteData';

function App() {
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

export default App;

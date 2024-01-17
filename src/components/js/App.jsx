import { useState } from 'react';
import '../css/App.css';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

function App() {

  const [query, setQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch(requiredInput) {
    setQuery(requiredInput.length > 0 ? requiredInput : "No city found / No data available");
    setIsLoading(false);
  };

  function handleLoading() {
    setIsLoading(true);
  };

  return (
    <>
      <Header handleSearch={handleSearch} handleLoading={handleLoading}/>
      <Body weatherData={query} isLoading={isLoading}/>
      <Footer />
    </>
  )
};

export default App;

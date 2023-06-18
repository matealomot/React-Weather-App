import { useState } from 'react';
import '../css/App.css';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

function App() {

  const [query, setQuery] = useState([])

  function handleSearch(requiredInput) {
    setQuery(requiredInput.length > 0 ? requiredInput : "No city found / No data available")
  }

  return (
    <>
      <Header handleSearch={handleSearch}/>
      <Body weatherData={query}/>
      <Footer />
    </>
  )
}

export default App

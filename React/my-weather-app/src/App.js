import React from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card.js'
import WeeklyForecast from './components/WeaklyCard'


/*
Period rada na projektu - Od Subote (19.3.2022) - Do Subote (26.3.2022)

Ulozeno vreme - Negde oko 48 sati sve skupa; U toku prvih par dana, dosta vremena je otislo na konceptualizaciju projekta, kao i istrazivanje (a i podsecanje) nekih od koncepata koje bi koristila; Vreme u periodu od Srede do Subote je najvise korisnjeno za rad na samom projektu.
*/

function App() {
  const [location, setLocation] = React.useState('');
  const [active, setActive] = React.useState("");
  const [apiData, setApiData] = React.useState({});
  const [forecastData, setForecastData] = React.useState([]);


  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
  const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${apiData.name}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const newData = () => (forecastData !== 'undefined' ? forecastData.map((item, pos) => 
    <WeeklyForecast key={pos} day={dayOfTheWeek(item.Date)} date={item.Date} temps={item.Temp} weather={item.Weather}/>
  ) : ("No data to show."))


  let inputHandler = (e) => {
    setLocation(e.target.value);
  }

  function fetchHandler() {
    fetch(apiUrl)
    .then(res => res.json())
    .then((data) => {
      setApiData(data)
      setLocation("")
      setActive("First")})
    .catch((error) => {
      console.log(error)
    })
  };

  function fetchForecast() {
    fetch(apiUrl2)
    .then(res => res.json())
    .then((data) => {
      const dataList = data.list.filter(reading => reading.dt_txt.includes("18:00:00")) 
      setForecastData(dataList.map(info => {
        return {
          Date: info.dt_txt,
          Temp: info.main.temp,
          Weather: info.weather[0].main
        }
      }))
      setActive("Second")
    })
    .catch(() => {
      console.log("Error fetching data")})
  };

  function dayOfTheWeek(d) {
    let date = new Date(d).getDay()
    let day = "";
    switch(date) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
        default:
          day = "Error";
          break;

    }
    return day;
  }
  
  return (
    <div className="App">
      <Header 
        onChange={inputHandler}
        value={location}
        onClick={fetchHandler}   
      />

      {active === "First" && 
            (typeof apiData.main != "undefined") ? (
              <div className="card--div" onClick={fetchForecast}>
                <Card 
                  {...apiData}
                />
              </div>
            ) : ("")
      }

      {active === "Second" && 
            <div>
              <div className="weakly--card">
                  {newData()}
              </div>
            </div>
      }

      <Footer />
      
    </div>
    
  );
}

export default App;

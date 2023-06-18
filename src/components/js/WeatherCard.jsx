import '../css/WeatherCard.css'
import Sunny from '../images/sunny.png';
import Clouds from '../images/clouds.png';
import Rain from '../images/rain.png';
import Storm from '../images/storm.png';
import Snow from '../images/snow.png';
import Mist from '../images/mist.png';
import BrokenClouds from '../images/broken_clouds.png';
import Cloudy from '../images/cloudy.png';
import Drizzle from '../images/drizzle.png';
import HeavyRain from '../images/heavy_rain.png';
import SnowStorm from '../images/snow_storm.png';
import Sleet from '../images/sleet.png';
import Haze from '../images/haze.png';
import Fog from '../images/fog.png';
import Dust from '../images/dust.png';
import Sand from '../images/sand.png';
import Tornado from '../images/tornado.png';
import FiveDaysWeatherReport from './FiveDayCards';
import React, {useState, useEffect} from 'react';

export default function WeatherCard(props) {

    const [cityCoordinates, setCityCoordinates] = useState({latitude: "",longitude: ""})
    const [fiveDayForcast, setFiveDayForcast] = useState([])
    const [showFiveDayForecast, setShowFiveDayForecast] = useState(false)
    
    const temperatureInCelsius = (props.temp - 273.15).toFixed(2);
    const temperatureFeelsLike = (props.tempFeels - 273.15).toFixed(2);
    const minTemperatureInCelsius = (props.minTemp - 273.15).toFixed(2);
    const maxTemperatureInCelsius = (props.maxTemp - 273.15).toFixed(2);
    const weaklyReport = [];

    /// Switches the value from true to false and vice versa on click which determines which card is displayed

    function handleChange() {
        setShowFiveDayForecast(prevBoolean => !prevBoolean)
    }

    /// Sets the latitude and longitude values into cityCoordinates state but only if the new values are different from the old ones; prevents sending fetch requests every time the card is clicked

    function setCoords(lat, lon) {
        setCityCoordinates(prevCoords => {
            if(prevCoords.latitude !== lat && prevCoords.longitude !== lon) {
                return {
                    ...prevCoords,
                    latitude: lat,
                    longitude: lon
                }
            }
            else {
                return prevCoords
            }
        })
        handleChange()
    }

    /// Checks if there was a change made to the cityCoordinates state and if so, makes a fetch request to retreive the 5 Day / 3 Hour forecast data based on Lon and Lat coordinates; extracts the array with the objects from the fetched data and breaks it into 5 separate arrays, each one corresponding to one of the 5 days and stores it into the fiveDayForcast state

    useEffect(() => {
        if(cityCoordinates.latitude != "" && cityCoordinates.longitude != "") {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityCoordinates.latitude}&lon=${cityCoordinates.longitude}&appid={here goes your personal api key}`)
            .then(response => response.json())
            .then(data => {
                const dataArray = data.list;
                const arraysByDate = [];

                for(let i = 0; i < dataArray.length; i++) {
                    const date = dataArray[i].dt_txt.split(" ")[0]; // Extract the date from the dt_txt property
                    const existingArray = arraysByDate.find(arr => arr[0]?.dt_txt.split(" ")[0] === date); // returns undefined if no match, returns the matching array (arr) if match is found

                    if(existingArray) {
                        existingArray.push(dataArray[i]); // Add the item to the existing array
                    } 
                    else{
                        arraysByDate.push([dataArray[i]]); // Create a new array with the item and add it to arraysByDate
                    }
                }
                setFiveDayForcast(arraysByDate)
            })
            .catch(err => console.log(err))
        }
    }, [cityCoordinates])

    /// Checks the Condition and Weather Type props value to determine which Image should be displayed in the weather card

    function checkWeatherConditions(conditions, weatherType) {
        if(conditions === "Clear") {
            return Sunny
        }
        else if(conditions === "Clouds") {
            if(weatherType === "few clouds" || weatherType === "scattered clouds") {
                return Cloudy
            }
            else if(weatherType === "broken clouds") {
                return BrokenClouds
            }
            else {
                return Clouds
            }
        }
        else if(conditions === "Rain") {
            return weatherType.includes('heavy') || weatherType.includes('extreme') ? HeavyRain : Rain
        }
        else if(conditions === "Drizzle") {
            return Drizzle
        }
        else if(conditions === "Thunderstorm") {
            return Storm
        }
        else if(conditions === "Snow") {
            if(weatherType.includes('rain') || weatherType.includes('sleet')) {
                return Sleet
            }
            else if(weatherType.includes('heavy')) {
                return SnowStorm
            }
            else {
                return Snow
            }
        }
        else if(conditions === "Haze") {
            return Haze
        }
        else if(conditions === "Fog") {
            return Fog
        }
        else if(conditions === "Smoke" || conditions === "Ash" || conditions === "Dust") {
            return Dust
        }
        else if(conditions === "Sand") {
            return Sand
        }
        else if(conditions === "Squall" || conditions === "Tornado") {
            return Tornado
        }
        else {
            return Mist
        };
    
    }
    /// Checks how high/low temperatuers are and depending on that assigns different styling to the spans containing the numbers

    function checkWarmth(number) {
        if(number <= 0) {
            return "cold"
        }
        else if(number > 0 && number <= 13) {
            return "chilly"
        }
        else if(number > 13 && number <= 20) {
            return "cool"
        }
        else if(number > 20 && number <= 30) {
            return "warm"
        }
        else if(number > 30 && number <= 35) {
            return "hot"
        }
        else {
            return "heatWave"
        }
    }

    /// Depending on the time of day the array is going to be either 5 or 6 items long. We loop as many times as there are items in fiveDayForcast array.
    /// For each loop, we create a div, and inside it we loop over the corresponding fiveDayForcast item (ex. first loop goes through first item, second loop through second, etc.) We push each div into the reportDays

    if(fiveDayForcast.length > 0) {
        // const isSixDays = weatherData.length === 6;
        // for (let i = 0; i < (isSixDays ? 6 : 5); i++)
        
        for (let i = 0; i < fiveDayForcast.length; i++) {
            weaklyReport.push(
                <div className="report-card" key={i}>
                    {fiveDayForcast[i].map((item, index) => {
                        const timestamp = item.dt_txt.split(" ");
                        console.log(timestamp[3])
                        const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                        const dayOfTheWeek = currentDate[0];
                
                        return (
                            <FiveDaysWeatherReport
                                key={index}
                                day={dayOfTheWeek}
                                date={timestamp[0]}
                                hour={timestamp[1]}
                                condition={item.weather[0].main}
                                temps={(item.main.temp - 273.15).toFixed(2)}
                                maxTemp={(item.main.temp_max - 273.15).toFixed(2)}
                                minTemp={(item.main.temp_min - 273.15).toFixed(2)}
                                clouds={item.clouds.all}
                                pressure={item.main.pressure}
                                humidity={item.main.humidity}
                                windSpeed={item.wind.speed}
                                weather={item.weather[0].description}
                                checkWarmth={checkWarmth}
                                checkWeather={checkWeatherConditions}
                            />
                        );
                    })}
                </div>
            );
        }
    }


    return(
        <div onClick={() => {setCoords(props.coordLat, props.coordLon)}}>
            {
                showFiveDayForecast
                ? /// Displayed if showFiveDayForecast is true
                <>
                    <div className="weakly-report-card">
                        {weaklyReport}
                    </div>
                </>
                : /// Displayed if showFiveDayForecast is false
                <>
                    <div className="daily-report-card">

                        <div className="weather-image">
                            <img src={`${checkWeatherConditions(props.condition, props.weatherType)}`} alt={props.condition}/>
                        </div>

                        <div className="weather-card">
                            <h2>{props.cityName}, {props.country}</h2>

                            <p><span style={{fontWeight: "bold"}}>Weather Condition:</span> {props.weatherType}</p>

                            <p><span className="conditions">Temperature</span>: <span className={`${checkWarmth(temperatureInCelsius)}`}>{temperatureInCelsius}</span> ºC</p>

                            <p>Temperature feels like: <span className={`${checkWarmth(temperatureFeelsLike)}`}>{temperatureFeelsLike}</span> ºC, ranging from <span className={`${checkWarmth(minTemperatureInCelsius)}`}>{minTemperatureInCelsius}</span> ºC to <span className={`${checkWarmth(maxTemperatureInCelsius)}`}>{maxTemperatureInCelsius}</span> ºC</p>

                            <p>Current/expected <span className="conditions">Wind speeds</span> are at <span className="numeralValue">{props.windSpeed}</span> m/s, <span className="conditions">Cloud density</span> is at <span className="numeralValue">{props.cloudsAll}</span> %, and <span className="conditions">Pressure levels</span> are at <span className="numeralValue">{props.pressure}</span> hPa/mBar</p>

                            <p className="geo-cords"><span className="conditions">Geo coords</span>: [Lon: {props.coordLon}, Lat: {props.coordLat}]</p>
                        </div>

                    </div>
                </>
            }
        </div>
    )
}

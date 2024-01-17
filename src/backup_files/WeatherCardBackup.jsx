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
    const minTemperatureInCelsius = (props.minTemp - 273.15).toFixed(2);
    const maxTemperatureInCelsius = (props.maxTemp - 273.15).toFixed(2);
    let image = "";
    let reportDayOne = "";
    let reportDayTwo = "";
    let reportDayThree = "";
    let reportDayFour = "";
    let reportDayFive = "";
    let reportDaySix = "";

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

    /// Checks if there was a change made to the cityCoordinates state and if so, makes a fetch request to retreive the 5 Day / 3 Hour forecast data based on Lon and Lat coordinates; extracts the array with the objects and breaks it into 5 separate arrays, each one corresponding to one of the 5 days and stores it into fiveDayForcast state

    useEffect(() => {
        if(cityCoordinates.latitude != "" && cityCoordinates.longitude != "") {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityCoordinates.latitude}&lon=${cityCoordinates.longitude}&appid=124cb4ee8efd323b7c8ca53cfc177baa`)
            .then(response => response.json())
            .then(data => {
                const dataArray = data.list;
                const arraysByDate = [];

                for(const item of dataArray) {
                    const date = item.dt_txt.split(" ")[0]; // Extract the date from the dt_txt property
                    const existingArray = arraysByDate.find(arr => arr[0]?.dt_txt.split(" ")[0] === date);
                    console.log(arraysByDate)
                    if(existingArray) {
                        existingArray.push(item); // Add the item to the existing array
                    } 
                    else{
                        arraysByDate.push([item]); // Create a new array with the item and add it to arraysByDate
                    }
                }
                setFiveDayForcast(arraysByDate)
            })
            .catch(err => console.log(err))
        }
    }, [cityCoordinates])

    /// Checks the Condition and Weather Type props value to determine which Image should be displayed in the weather card

    if(props.condition === "Clear") {
        image = Sunny
    }
    else if(props.condition === "Clouds") {
        if(props.weatherType === "few clouds" || props.weatherType === "scattered clouds") {
            image = Cloudy
        }
        else if(props.weatherType === "broken clouds") {
            image = BrokenClouds
        }
        else {
            image = Clouds
        }
    }
    else if(props.condition === "Rain") {
        props.weatherType.includes('heavy') || props.weatherType.includes('extreme') ? image = HeavyRain : image = Rain
    }
    else if(props.condition === "Drizzle") {
        image = Drizzle
    }
    else if(props.condition === "Thunderstorm") {
        image = Storm
    }
    else if(props.condition === "Snow") {
        if(props.weatherType.includes('rain') || props.weatherType.includes('sleet')) {
            image = Sleet
        }
        else if(props.weatherType.includes('heavy')) {
            image = SnowStorm
        }
        else {
            image = Snow
        }
    }
    else if(props.condition === "Haze") {
        image = Haze
    }
    else if(props.condition === "Fog") {
        image = Fog
    }
    else if(props.condition === "Smoke" || props.condition === "Ash" || props.condition === "Dust") {
        image = Dust
    }
    else if(props.condition === "Sand") {
        image = Sand
    }
    else if(props.condition === "Squall" || props.condition === "Tornado") {
        image = Tornado
    }
    else {
        image = Mist
    };

    /// Checks if fiveDaysForcast isn't empty and if so, it maps each one of its arrays into a separate variable so that the 5 Day / 3 Hour forecast data inside the arrays can be properly displayed on screen

    // * Depending on the time of day the array is going to be either 5 or 6 items long, so the maping has to be adjusted accordingly. 
    
    if(fiveDayForcast.length > 0) {
        const [dayOne, dayTwo, dayThree, dayFour, dayFive, daySix] = fiveDayForcast;

        console.log(dayOne, dayTwo, dayThree, dayFour, dayFive, daySix)
        if(fiveDayForcast.length === 6) {
            reportDayOne = fiveDayForcast[0].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })
    
            reportDayTwo = fiveDayForcast[1].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })
    
            reportDayThree = fiveDayForcast[2].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })
    
            reportDayFour = fiveDayForcast[3].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })
    
            reportDayFive = fiveDayForcast[4].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })
    
            reportDaySix = fiveDayForcast[5].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })
        }
        else if(fiveDayForcast.length === 5) {
            reportDayOne = fiveDayForcast[0].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })

            reportDayTwo = fiveDayForcast[1].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })

            reportDayThree = fiveDayForcast[2].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })

            reportDayFour = fiveDayForcast[3].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })

            reportDayFive = fiveDayForcast[4].map((item, index) => {
                const timestamp = item.dt_txt.split(" ");
                const currentDate = new Date(item.dt * 1000).toDateString().split(" ");
                const dayOfTheWeek = currentDate[0];
                return <FiveDaysWeatherReport 
                    key={index} 
                    day={dayOfTheWeek}
                    date={timestamp[0]}
                    hour={timestamp[1]}
                    condition={item.weather[0].main}
                    temps={(item.main.temp - 273.15).toFixed(2)}
                    weather={item.weather[0].description} 
                />
            })
        }
    }

    return(
        <div onClick={() => {setCoords(props.coordLat, props.coordLon)}}>
            {
                showFiveDayForecast /// false by default
                ? /// Displayed if showFiveDayForecast is true
                <>
                    <div className="weakly-report-card">
                        <div className="report-card"> 
                            {reportDayOne}
                        </div>
                        <div className="report-card">
                            {reportDayTwo}
                        </div>
                        <div className="report-card">
                            {reportDayThree}
                        </div>
                        <div className="report-card">
                            {reportDayFour}
                        </div>
                        <div className="report-card">
                            {reportDayFive}
                        </div>
                        {reportDaySix !== "" && 
                            <div className="report-card">
                                {reportDaySix}
                            </div>
                        }
                    </div>
                </>
                : /// Displayed if showFiveDayForecast is false
                <>
                    <div className="daily-report-card">
                        <div className="weather-image">
                            <img src={image} alt={props.condition}/>
                        </div>
                        <div className="weather-card">
                            <h2>{props.cityName}, {props.country}</h2>
                            <p><span style={{fontWeight: "bold"}}>Weather Condition:</span> {props.weatherType}</p>
                            <p>Temperature is <span className="temperature">{temperatureInCelsius}</span> ºC, ranging from <span className="temperature">{minTemperatureInCelsius}</span> ºC to <span className="temperature">{maxTemperatureInCelsius}</span> ºC, with wind speeds at {props.windSpeed} m/s, cloud density at {props.cloudsAll}%, and pressure levels at {props.pressure} hpa
                            </p>
                            <p className="geo-cords">Geo coords [Lon: {props.coordLon}, Lat: {props.coordLat}]</p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
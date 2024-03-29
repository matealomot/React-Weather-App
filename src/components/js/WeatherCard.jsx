import '../css/WeatherCard.css';
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
	const [isLoading, setIsLoading] = useState(false);
	const [animateReportCard, setAnimateReportCard] = useState(false);
	
	const temperatureInCelsius = (props.temp - 273.15).toFixed(2);
	const temperatureFeelsLike = (props.tempFeels - 273.15).toFixed(2);
	const minTemperatureInCelsius = (props.minTemp - 273.15).toFixed(2);
	const maxTemperatureInCelsius = (props.maxTemp - 273.15).toFixed(2);
	const weaklyReport = [];

	function handleChange() {
		setShowFiveDayForecast(prevBoolean => !prevBoolean)
	}

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
			};
		});
		handleChange();
	};

	useEffect(() => {
		if(cityCoordinates.latitude != "" && cityCoordinates.longitude != "") {
			setIsLoading(true)
			
			fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityCoordinates.latitude}&lon=${cityCoordinates.longitude}&appid=[API goes here]`)
			.then(response => response.json())
			.then(data => {
				const dataArray = data.list;
				const arraysByDate = [];

				for(let i = 0; i < dataArray.length; i++) {
						const date = dataArray[i].dt_txt.split(" ")[0];
						const existingArray = arraysByDate.find(arr => arr[0]?.dt_txt.split(" ")[0] === date);

						if(existingArray) {
								existingArray.push(dataArray[i]);
						} 
						else{
								arraysByDate.push([dataArray[i]]);
						}
				}
				setFiveDayForcast(arraysByDate);
				setIsLoading(false);
			})
			.catch(err => console.log(err))
			.finally(() => {
        setIsLoading(false);
				setAnimateReportCard(true);
      });
		}
	}, [cityCoordinates]);

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

	if(fiveDayForcast.length > 0) {
		
		for (let i = 0; i < fiveDayForcast.length; i++) {
			weaklyReport.push(
				<div className="report-card" key={i}>
					{fiveDayForcast[i].map((item, index) => {
						const timestamp = item.dt_txt.split(" ");
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
		};
	};


	return (
		<div className="result" style={props.style} onClick={() => {setCoords(props.coordLat, props.coordLon)}}>
			{
				showFiveDayForecast
				?
					<div className={`weakly-report-card ${isLoading ? 'loading' : animateReportCard ? 'animate' : ''}`}>
						{
							isLoading ?
							<h1>Fetching Data...</h1>
							:
							weaklyReport
						}
					</div>
				:
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
			}
		</div>
	);
};



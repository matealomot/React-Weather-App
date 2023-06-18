import '../css/Body.css';
import WeatherCard from './WeatherCard';

export default function Main(props) {

    let weatherReport = '';

    if(Array.isArray(props.weatherData)) {
        weatherReport = props.weatherData.map((data) => (
            <WeatherCard
                key={data.id}
                cityName={data.name}
                country={data.sys.country}
                temp={data.main.temp}
                tempFeels={data.main.feels_like}
                minTemp={data.main.temp_min}
                maxTemp={data.main.temp_max}
                weatherType={data.weather[0].description}
                windSpeed={data.wind.speed}
                cloudsAll={data.clouds.all}
                pressure={data.main.pressure}
                coordLon={data.coord.lon}
                coordLat={data.coord.lat}
                condition={data.weather[0].main}
            />
        ))
    }
    else {
        weatherReport = <div className="daily-report-card">{props.weatherData}</div>
    }

    return (
        <main>
            <div className="main--body">
                {weatherReport}
            </div>
        </main>
    )
}
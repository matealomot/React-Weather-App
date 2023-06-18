import '../css/FiveDayCards.css';
import '../css/WeatherCard.css';

export default function FiveDaysWeatherReport(props) {

    return(
      <div className="weather--report">

        <h2>{props.day}</h2>

        <p className="weakly-date"><strong>{props.date} - {props.hour.slice(0,5)}h</strong></p>       

        <img className="weather-icon" src={`${props.checkWeather(props.condition, props.weather)}`} alt={props.condition}/>

        <p><strong>Weather:</strong> <span>{props.weather}</span></p>

        <p><strong>Temperature:</strong> <span className={`${props.checkWarmth(props.temps)}`}>{props.temps}</span> ºC</p>

        <p><strong>Maximum:</strong> <span className={`${props.checkWarmth(props.maxTemp)}`}>{props.maxTemp}</span> ºC</p>

        <p><strong>Minimum:</strong> <span className={`${props.checkWarmth(props.minTemp)}`}>{props.minTemp}</span> ºC</p>

        <p><strong>Cloud density:</strong> <span className="numeralValue">{props.clouds}</span> %</p>

        <p><strong>Pressure:</strong> <span className="numeralValue">{props.pressure}</span> hPa</p>

        <p><strong>Humidity:</strong> <span className="numeralValue">{props.humidity}</span> %</p>

        <p><strong>Wind:</strong> <span className="numeralValue">{props.windSpeed}</span> m/s</p>

      </div>
    )
}
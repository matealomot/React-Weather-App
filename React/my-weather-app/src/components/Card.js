import React from 'react'
import Sunny from '../images/sunny.png'
import Clouds from '../images/clouds.png'
import Rain from '../images/rain.png'
import Storm from '../images/storm.png'
import Snow from '../images/snow.png'
import Mist from '../images/mist.png'

export default function Card(props) {

    const [condition, setCondition] = React.useState()

    React.useEffect(() => {
      if(props.weather[0].main === "Clear") {
        setCondition(Sunny)
      }
      else if(props.weather[0].main === "Clouds") {
        setCondition(Clouds)
      }
      else if((props.weather[0].main === "Rain") || (props.weather[0].main === "Drizzle")) {
        setCondition(Rain)
      }
      else if(props.weather[0].main === "Thunderstorm") {
        setCondition(Storm)
      }
      else if(props.weather[0].main === "Snow") {
        setCondition(Snow)
      }
      else {
        setCondition(Mist)
      }
    }, [props.weather])

    return (

        <div className="weather-card">
          <div className='img'>
            <img src={condition} alt=""/>
          </div>
          <div className="main">
            <h4>{props.name}, {props.sys.country}, Weather Condition: {props.weather[0].description}</h4>
            <p>Temperature is <span className="temperature">{props.main.temp}</span> ºC, ranging from {props.main.temp_min} ºC to {props.main.temp_max} ºC, wind {props.wind.speed} m/s, clouds {props.clouds.all}%, {props.main.pressure} hpa
            </p>
            <p className="geo-cords">Geo coords [{props.coord.lon}, {props.coord.lat}]</p>
          </div>
        </div>

    )
}
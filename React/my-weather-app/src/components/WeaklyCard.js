import React from 'react'
import Sunny from '../images/sunny.png'
import Clouds from '../images/clouds.png'
import Rain from '../images/rain.png'
import Storm from '../images/storm.png'
import Snow from '../images/snow.png'
import Mist from '../images/mist.png'

export default function WeeklyForecast({date, temps, weather, id, day}) {

    const [condition, setCondition] = React.useState("")
    const [className, setClassName] = React.useState("")

    
    React.useEffect(() => {
      if(weather === "Clear") {
        setClassName("Clear")
        setCondition(Sunny)
      }
      else if(weather === "Clouds") {
        setClassName("Clouds")
        setCondition(Clouds)
      }
      else if((weather === "Rain") || (weather === "Drizzle")) {
        setClassName("Rain")
        setCondition(Rain)
      }
      else if(weather === "Thunderstorm") {
        setClassName("Storm")
        setCondition(Storm)
      }
      else if(weather === "Snow") {
        setClassName("Snow")
        setCondition(Snow)
      }
      else {
        setClassName("Mist")
        setCondition(Mist)
      }
    }, [weather])

    return (
        <div className="weakly-forcast" key={id}>
            <h3>{day}</h3>
            <p className="weakly-date">{date}</p>
            <img className="weather-icon" src={condition} alt=""/>
            <p><b>Temp:</b> <span className="temperature">{temps}</span> ºC</p>
            <p><b>Weather:</b> <span className={className}>{weather}</span></p>
        </div>
    )
}
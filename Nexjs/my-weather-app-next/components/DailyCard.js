import React from 'react'


export default function Card(props) {

    const [condition, setCondition] = React.useState()

    React.useEffect(() => {
      if(props.weather[0].main === "Clear") {
        setCondition("/sunny.png")
      }
      else if(props.weather[0].main === "Clouds") {
        setCondition("/clouds.png")
      }
      else if((props.weather[0].main === "Rain") || (props.weather[0].main === "Drizzle")) {
        setCondition("/rain.png")
      }
      else if(props.weather[0].main === "Thunderstorm") {
        setCondition("/storm.png")
      }
      else if(props.weather[0].main === "Snow") {
        setCondition("/snow.png")
      }
      else {
        setCondition("/mist.png")
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
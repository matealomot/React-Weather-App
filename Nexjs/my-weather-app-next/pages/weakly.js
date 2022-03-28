import React, {useContext} from "react";

export default function Weakly({date, temps, weather, id, day}) {

    
    const [condition, setCondition] = React.useState("")
    const [className, setClassName] = React.useState("")

    
    React.useEffect(() => {
        if(weather === "Clear") {
            setCondition("/sunny.png")
        }
        else if(weather === "Clouds") {
            setCondition("/clouds.png")
        }
        else if((weather === "Rain") || (weather === "Drizzle")) {
            setCondition("/rain.png")
        }
        else if(weather === "Thunderstorm") {
            setCondition("/storm.png")
        }
        else if(weather === "Snow") {
            setCondition("/snow.png")
        }
        else {
            setCondition("/mist.png")
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

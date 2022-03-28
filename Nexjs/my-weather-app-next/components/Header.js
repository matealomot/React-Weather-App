import React from "react";
import Card from './DailyCard'
import WeeklyForecast from '../pages/weakly'
import {useRouter} from 'next/router'


export default function Header() {

    const [data, setData] = React.useState({});
    const [active, setActive] = React.useState("");
    const [forcastData, setForcast] = React.useState({});
    const [value, setValue] = React.useState("");

    const newData = () => (forcastData !== 'undefined' ? forcastData.map((item, pos) => 
      <WeeklyForecast key={pos} day={dayOfTheWeek(item.Date)} date={item.Date} temps={item.Temp} weather={item.Weather}/>
    ) : ("No data to show."))
    

    function inputHandler(e) {
        setValue(e.target.value);
    }

    const fetchData = async () => {
        const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${process.env.customKey}`);
        const newData = await req.json();
        setActive("First");

        setData(newData);
    };

    const fetchWeaklyData = async () => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=${process.env.customKey}`);
        const newForcast = await res.json();
        const data = newForcast.list.filter( reading => reading.dt_txt.includes("18:00:00"));
        setActive("Second");

        setForcast(data.map(info => {
          return {
            Date: info.dt_txt,
            Temp: info.main.temp,
            Weather: info.weather[0].main
          }
        }));

    }

    console.log(forcastData)

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

      console.log(typeof forcastData)

    return (
        <div>
            <header>
                <form>
                    <input 
                        type="text" 
                        placeholder='Enter location'
                        onChange={inputHandler}
                        value={value}
                    />
                    
                    <button onClick={fetchData} type="button">Search</button>
                </form>
            </header>

                {} 
            {active === "First" && 
                (typeof data.main != "undefined") ? (
                    <div className="card--div" onClick={fetchWeaklyData}>
                    <Card {...data}/>
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
        </div>
    )
}


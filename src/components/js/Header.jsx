import '../css/Header.css'
import logo from '../images/weatherobserver_logo.png';
import React, {useState} from 'react'

export default function Header(props) {

    const [inputValue, setInputValue] = useState("")

    function refreshPage() {
        window.location.reload();
    }

    function handleInputChange(e) {
        setInputValue(e.target.value)
    }

    function searchWeather(e) {
        if(e.type === 'click' || e.key === 'Enter') {
            if(inputValue != "") {
                fetch(`https://api.openweathermap.org/data/2.5/find?q=${inputValue}&appid=1be1041608a8f4a3ee68fe0f45d7a3f6`)
                .then(response => response.json())
                .then(data => props.handleSearch(data.list))
                .catch(err => console.log(err))
    
                setInputValue("")
            }
            else {
                alert("Please input city name")
            }
        }
    }

    return (
        <header>
            <img src={logo} alt="weather observer logo" onClick={refreshPage}></img>
            <div>
                <input 
                  type="text" 
                  placeholder='Enter location'
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={searchWeather}
                />
                <button type="button" onClick={searchWeather}>Serach</button>
            </div>
      </header>
    )
}
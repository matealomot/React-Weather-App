import React from "react";

export default function Header({value, onChange, onClick}) {
    return (
        <header>
            <form>
                <input 
                  type="text" 
                  placeholder='Enter location'
                  onChange={onChange}
                  value={value}
                />
                <button onClick={onClick} type="button">Serach</button>
            </form>
      </header>
    )
}
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [city, setCity] = useState("")
  const [info, setInfo] = useState([])



  async function fetchData() {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83b86407220d3319ec93b70bfcd4ad53`
    )
    setInfo(data)
    setCity("")
  }




  const handleSubmit = e => {
    e.preventDefault()
    fetchData()
  
  }
    

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} - ${date} - ${month} - ${year}`
  }



  return (
    <div className="App">

        <div className={(typeof info.main != "undefined") ? ((info.main.temp > 16) ? 'container warm' : 'container') : 'nothing'}>
          <form className='form' onSubmit={handleSubmit}>
            <input className='input' placeholder='Enter Your City' type="text" value = {city} onChange={(e) => setCity(e.target.value)}></input>
          </form>
          {(typeof info.sys != "undefined") ? (
        <div>
            <div className='first'>
              <h2 children="title">{info.name}, {info.sys.country}</h2>
              <h2>{dateBuilder(new Date())}</h2>
              <h2 className='temp'>{Math.round(info.main.temp - 273)}℃</h2>
            </div>     
            <div className='first'>
              <h3 className='temp'>{info.weather[0].description}</h3>
              <h3 className='temp'>pressure : {info.main.pressure}</h3>
            </div>

            <div className='first'>
              <h3 className='temp'>humidity : {info.main.humidity}</h3>
            </div>
        </div>
        ) : ('')}


      </div>
    </div>
  );
}

export default App;

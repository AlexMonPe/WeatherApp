import { useEffect, useState } from "react";
import { apiConsumer } from "../../services/apiConsumer";

export const Search = () => {
  const [searchCity, setSearchCity] = useState();
  const [cityWeather, setCityWeather] = useState();

  const loadCityWeather = async (event) => {
    try {
      if(event.key === 'Enter'){
      const infoWeather = await apiConsumer.getWeather(searchCity);
      console.log(infoWeather, "infoWeather in useEffect");
      setCityWeather(infoWeather);
      }
      
    } catch (error) {
      console.log(error, `Error getting weather of city`);
    }
  };
 
  let formatedDate;
  let icon;

  // import icon from "../../../public/icons/01d.png";

  if (cityWeather) {
    formatedDate = new Date(cityWeather.list[0].dt * 1000).toLocaleString(
      "es-ES",
      {
        timeStyle: "short",
        dateStyle: "long",
      }
    );
    icon = cityWeather.list[0].weather[0].icon;
    console.log(cityWeather.list[0].dt * 1000, "infoWeather antes del return");
  }

  let iconRoute = `./public/icons/${icon}.png`;

  return (
    <div>
      <div className="search-container">
         <input
        className="search"
        type="search"
        name="search"
        value={searchCity}
        placeholder="Introduce tu ciudad"
        onChange={event => setSearchCity(event.target.value)}
        onKeyPress={loadCityWeather}

      ></input>
      {cityWeather && (
        <div className="search-data">
          <div className="city">{cityWeather.list[0].name}</div>
          <div className="temperature">
            {Math.floor(cityWeather.list[0].main.temp)}ºC
          </div>
          <div>{cityWeather.list[0].weather[0].description}</div>
          <div>
            <img src={iconRoute}></img>
          </div>
          <div>
            <p>Min Temp: {Math.round(cityWeather.list[0].main.temp_min)} ºC</p>
            <p>Max Temp: {Math.round(cityWeather.list[0].main.temp_max)} ºC</p> 
          </div>
          <div>{formatedDate}</div>
        </div>
      )}
      </div>
     
    </div>
  );
};

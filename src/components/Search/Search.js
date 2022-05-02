import { useState } from "react";
import { apiConsumer } from "../../services/apiConsumer";
import { BsSearch } from "react-icons/bs";
import {FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa"

export const Search = () => {
  const [searchCity, setSearchCity] = useState();
  const [cityWeather, setCityWeather] = useState();
  let container = document.getElementById("search-container");

  const loadCityWeather = async (event) => {
    try {
      if (event.key === "Enter") {
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
    const hour = new Date(cityWeather.list[0].dt * 1000).getHours();
    console.log(hour, "horaa");
    if (hour >6 && hour <20){
      container.classList.remove("night");
      container.classList.add("day");

    }else {
      container.classList.remove("day");
      container.classList.add("night");
    }
  }

  let iconRoute = `./src/assets/icons/${icon}.png`;

  return (
    <div>
      <div className="search-container night" id="search-container">
        <input
          className="search"
          type="search"
          name="search"
          value={searchCity}
          placeholder="Introduce tu ciudad"
          onChange={(event) => setSearchCity(event.target.value)}
          onKeyPress={loadCityWeather}
        ></input>
        <button onClick={loadCityWeather({key: "Enter"})} ><BsSearch /></button> 
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
            <div>{formatedDate}</div>
            <div className="tempsMaxMin">
              <p>Máx : {Math.round(cityWeather.list[0].main.temp_max)} ºC <FaTemperatureHigh /></p>
              <p>Mín : {Math.round(cityWeather.list[0].main.temp_min)} ºC <FaTemperatureLow /></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

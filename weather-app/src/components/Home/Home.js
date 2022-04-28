import { useEffect, useState } from "react";
import { apiConsumer } from "../../services/apiConsumer";
import { Search } from "../Search/Search";

export const Home = () => {
  const [cityWeather, setCityWeather] = useState();

  useEffect(() => {
    const loadCityWeather = async () => {
      try {
        const infoWeather = await apiConsumer.getWeather("Barcelona");
        console.log(infoWeather, "infoWeather in useEffect");
        setCityWeather(infoWeather);
      } catch (error) {
        console.log(error, `Error getting weather of city`);
      }
    };
    loadCityWeather();
  }, []);
  
let formatedDate;
let icon;
// import icon from "../../../"

  if (cityWeather){
    formatedDate = new Date(cityWeather.list[0].dt * 1000).toLocaleString(
    "es-ES",
    {
      timeStyle: "short",
      dateStyle: "long",
    })
    icon = cityWeather.list[0].weather[0].icon;
    console.log(cityWeather.list[0].dt * 1000, "infoWeather antes del return");
  }
  
  return (
    <div>
      {cityWeather && (
        <div className="home-container">
          <Search />
          <div className="city">{cityWeather.list[0].name}</div>
          <div className="temperature">{Math.floor(cityWeather.list[0].main.temp)}</div>
          <div>{cityWeather.list[0].weather[0].description}</div>
          <div>
            <span>{Math.round(cityWeather.list[0].main.temp_min)}</span>
            {Math.round(cityWeather.list[0].main.temp_max)}
          </div>
          <div>{formatedDate}</div>
          <div><img src=""></img> </div>
        </div>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import { apiConsumer } from "../../services/apiConsumer";

export const Home = () => {
  const urlTowns = "https://www.el-tiempo.net/api/json/v1/municipios";
  const movies = "https://api-restfull-movies-nodejs.herokuapp.com/movies";

  const [towns, setTowns] = useState([]);
  useEffect(() => {
    const loadTowns = async () => {
      try {
        const towns = await apiConsumer.getTowns();
        console.log(towns, ' towns in useEffect')
        setTowns(towns);
      } catch (error) {
        console.log(error, "Error in loadTowns");
      }
    };
    loadTowns();
  }, []);
  return (
    <div>
      <div className="home-container">
        <div className="city">Leganes</div>
        <div className="temperature">12ºC</div>
        <div>Rain</div>
        <div>Max. 17º Min. 10º</div>
        <div>amanecer: 6am Anochecher: 21pm</div>

        <div>Previsiones proximos dias</div>
      </div>
    </div>
  );
};

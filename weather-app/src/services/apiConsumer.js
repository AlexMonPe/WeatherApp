export const apiConsumer = {
  getTowns: async () => {
    try {
      const towns = await fetch(
        "https://www.el-tiempo.net/api/json/v1/municipios",
        {
          method: "GET",
        }
      );
      const townsData = await towns.json();
      console.log(townsData, "townsdata");
      return townsData;
    } catch (error) {
      console.log(error, "Error in getTowns");
    }
  },
  getWeatherOfTown:  async (idProvince, idTown) => {
    try {
      const towns = await fetch(
        `https://www.el-tiempo.net/api/json/v2/provincias/${idProvince}/municipios/${idTown}`,
        {
          method: "GET",
        }
      );
      const townsData = await towns.json();
      console.log(townsData, "townsdata");
      return townsData;
    } catch (error) {
      console.log(error, "Error in getTowns");
    }
  },
};

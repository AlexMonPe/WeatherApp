export const apiConsumer = {
  getWeather: async (city) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key":
            "bfb8f461admsh74b33ce9b2fc475p12072cjsna2302dbe2447",
        },
      };
      const weatherInfo = await fetch(
        `https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=sp`,
        options
      );
      return await weatherInfo.json();
    } catch (error) {
      console.log(error, "Error in getTowns");
    }
  },
};

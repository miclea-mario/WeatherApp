import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";

export default function App() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [unit, setUnit] = useState("°C");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [date, setDate] = useState("");
  console.log(data);

  function getDateTime() {
    let now = new Date(),
      hour = now.getHours(),
      minute = now.getMinutes();

    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (minute < 10) {
      minute = "0" + minute;
    }

    let dayString = weekDays[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getDateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    getWeatherData(searchValue);
  }, [searchValue]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const setCityImage = async (cityName) => {
    try {
      const imageUrl = await getCityImage(cityName);
      setBackgroundImage(imageUrl);
    } catch (error) {
      console.error("Error fetching background image:", error);
    }
  };

  const getUserLocation = async () => {
    try {
      const response = await fetch("https://geolocation-db.com/json/");

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.city;
    } catch (error) {
      console.error("Error fetching user location:", error.message);
      throw error;
    }
  };

  const getWeatherData = async (cityName) => {
    try {
      let apiURL;

      // if city is not provided then get user location
      if (!cityName) {
        cityName = await getUserLocation();
      }

      console.log(cityName);

      apiURL = `${process.env.REACT_APP_API_URL}/${encodeURIComponent(
        cityName
      )}?unitGroup=metric&key=${
        process.env.REACT_APP_API_KEY
      }&contentType=json`;

      const response = await fetch(apiURL);
      const result = await response.json();
      setData(result);
      setCityImage(cityName);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getCityImage = async (cityName) => {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        cityName
      )}&orientation=landscape&per_page=1`,
      {
        headers: {
          Authorization: process.env.REACT_APP_API_PEXELS_KEY,
        },
      }
    );
    const result = await response.json();

    if (result.photos && result.photos.length > 0) {
      const imageUrl = result.photos[0].src.original;
      return imageUrl;
    } else {
      console.error("No photos found in the response.");
      return;
    }
  };

  function handleUnitChange() {
    if(unit == '°C')
      setUnit('°F');
    else setUnit('°C');
  }
  return (
      <div
        className="overflow-auto h-screen sm:h-auto md:flex items-center place-content-center"
        style={{
          backgroundImage: `url("${
            backgroundImage || "https://picsum.photos/1600/700"
          }")`,
          backgroundSize: "cover",
        }}
      >
        {typeof data.address != "undefined" ? (
          <Weather
            weatherData={data}
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            onUnitChange = {handleUnitChange}
            unit={unit}
            date = {date}
          />
        ) : (
          <div></div>
        )}
      </div>
  );
}

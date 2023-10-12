import React, { useState, useEffect } from 'react';
import styles from "./style.module.css";


import cloud_icon from '../../Assets/cloud.png';
import wind_icon from '../../Assets/wind.png';
import humidity_icon from '../../Assets/humidity.png';
import search_icon from '../../Assets/search.png';
import clear_icon from '../../Assets/clear.png';
import drizzle_icon from '../../Assets/drizzle.png';
import rain_icon from '../../Assets/rain.png';
import snow_icon from '../../Assets/snow.png';

const WeatherOne = () => {

    //Şimdilik buradan alıyoruz .env den almadık
    const api_key = "5fceba9a4518c3fa99e0b1c4c3846b02";


    const [inputValue, setInputValue] = useState("İstanbul");
    const [temp, setTemp] = useState("");
    const [cityName, setCityName] = useState("");
    const [humidity, setHumidity] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [wicon, setWicon] = useState(cloud_icon);



    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const search = async () => {
        if (inputValue === "") {
            return;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${api_key}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            const celsiusTemp = kelvinToCelsius(data.main.temp);
            setTemp(celsiusTemp);
            setCityName(data.name);
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed);

            const weatherIcons = {
                "01d": clear_icon,
                "01n": clear_icon,
                "02d": cloud_icon,
                "02n": cloud_icon,
                "03d": drizzle_icon,
                "03n": drizzle_icon,
                "04d": drizzle_icon,
                "04n": drizzle_icon,
                "09d": rain_icon,
                "09n": rain_icon,
                "10d": rain_icon,
                "10n": rain_icon,
                "13d": snow_icon,
                "13n": snow_icon,
            };

            setWicon(weatherIcons[data.weather[0].icon] || clear_icon);
        } catch (error) {
            console.error("Hata:", error);
        }
    };

    function kelvinToCelsius(kelvin) {
        const celsius = (kelvin - 273.15).toFixed(1);
        return celsius;
    }

    useEffect(() => {
        search();
    });

    return (
        <div className={styles.weatherOne}>
            <div className={styles.topBar}>
                <input type="text" id="cityInput" placeholder="Arama" onChange={handleInputChange} value={inputValue} />
                <div className={styles.topBar_Icon} id="searchButton" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className={styles.weatherBody}>
                <img src={wicon} alt="" />
                <div className={styles.weatherTemp} id="temp">
                    {temp}°C
                </div>
                <div className={styles.weatherCity} id="city">
                    {cityName}
                </div>
                <div className={styles.weatherElementCapsule}>
                    <div className={styles.weatherElement}>
                        <img src={humidity_icon} alt="" />
                        <div>
                            <div className={styles.elementSize} id="humidity">
                                {humidity}%
                            </div>
                            <div className={styles.elementSizeSmall}>Humidty</div>
                        </div>
                    </div>
                    <div className={styles.weatherElement}>
                        <img src={wind_icon} alt="" />
                        <div>
                            <div className={styles.elementSize} id="wind">
                                {windSpeed} km/h
                            </div>
                            <div className={styles.elementSizeSmall}>Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherOne;

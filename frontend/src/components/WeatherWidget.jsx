import { useEffect, useState } from "react";
import {
  CloudRain,
  Thermometer,
  Wind,
  Sun,
} from "lucide-react";

export function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 🌍 1. SAFE REVERSE GEOCODING (NO CORS ISSUES)
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const geoData = await geoRes.json();

          const locationName =
            geoData?.address
              ? `${geoData.address.village || geoData.address.town || geoData.address.city || "Unknown"},
                 ${geoData.address.county || ""},
                 ${geoData.address.country || ""}`
              : "Unknown Location";

          // 🌦 2. WEATHER DATA (OP
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean&timezone=auto`
          );

          const data = await weatherRes.json();

          setWeather({
            location: locationName,
            current: {
              temp: data.current_weather.temperature,
              windSpeed: data.current_weather.windspeed,
              condition: "Live Weather",
            },
            forecast: data.daily.time.map((date, i) => ({
              day: new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
              }),
              high: data.daily.temperature_2m_max[i],
              low: data.daily.temperature_2m_min[i],
              rain: data.daily.precipitation_probability_mean[i],
            })),
          });

          setLoading(false);
        } catch (err) {
          console.error("Weather error:", err);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Location error:", error);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <div className="weather-card">Loading weather...</div>;
  if (!weather)
    return <div className="weather-card">Unable to load weather</div>;

  return (
    <div className="weather-card">

      {/* HEADER */}
      <div className="weather-header">
        <div className="title-row">
          <CloudRain className="icon blue" />
          <h2>Weather & Climate</h2>
        </div>

        {/* 📍 REAL LOCATION */}
        <p className="location">{weather.location}</p>
      </div>

      {/* CURRENT WEATHER */}
      <div className="weather-body">
        <div className="current-weather">
          <div className="current-top">
            <div>
              <h1 className="temp">{weather.current.temp}°C</h1>
              <p className="condition">{weather.current.condition}</p>
            </div>
            <Sun className="icon sun" />
          </div>

          <div className="stats">
            <div className="stat">
              <Wind className="icon blue" />
              <div>
                <p>Wind</p>
                <span>{weather.current.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* FORECAST */}
        <div className="forecast">
          <h3>Forecast</h3>

          {weather.forecast.map((day, i) => (
            <div className="forecast-row" key={i}>
              <div>
                <p className="day">{day.day}</p>
              </div>

              <div className="forecast-stats">
                <span>
                  <Thermometer className="icon red" /> {day.high}°
                </span>
                <span>
                  <Thermometer className="icon blue" /> {day.low}°
                </span>
                <span>
                  <CloudRain className="icon blue" /> {day.rain}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ADVICE */}
        <div className="advice">
          <h4>Farming Advice</h4>
          <p>
            Live weather detected for your exact location. Use rainfall data
            before irrigation.
          </p>
        </div>
      </div>
    </div>
  );
}
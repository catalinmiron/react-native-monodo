import { LucideIconName } from "./types";

export const API_URL = `https://api.openweathermap.org/data/2.5/forecast/daily`;

// ?lat=44.34&lon=10.99&cnt=7&appid={API key}

export interface ForecastPayload {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: DayWeather[];
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface DayWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain?: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export function getIcon(id: number): LucideIconName {
  if (id >= 200 && id < 300) {
    return "CloudRain";
  } else if (id >= 300 && id < 500) {
    return "CloudHail";
  } else if (id >= 500 && id < 600) {
    return "CloudRain";
  } else if (id >= 600 && id < 700) {
    return "Snowflake";
  } else if (id >= 700 && id < 800) {
    return "CloudFog";
  } else if (id === 800) {
    return "SunMedium";
  } else if (id >= 801 && id < 803) {
    return "Cloudy";
  } else if (id >= 802 && id < 900) {
    return "Cloudy";
  } else if (id === 905 || (id >= 951 && id <= 956)) {
    return "Wind";
  } else if (id >= 900 && id < 1000) {
    return "CloudRain";
  }

  return "Sun";
}

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// Define a class for the Weather object
class Weather {
  constructor(
    public currentForecast: {
      date: string;
      icon: string;
      iconDescription: string;
      tempF: number;
      windSpeed: number;
      humidity: number;
    },
    public forecast: Array<{
      date: string;
      icon: string;
      iconDescription: string;
      tempF: number;
      windSpeed: number;
      humidity: number;
    }>
  ) {}
}



// Complete the WeatherService class
class WeatherService {
  private baseURL: string =
    process.env.API_BASE_URL || "https://api.openweathermap.org/data/2.5";
  private apiKey: string = process.env.API_KEY || "";

  // Fetch location data based on city name
  private async fetchLocationData(city: string): Promise<Coordinates> {
    const query = this.buildGeocodeQuery(city);
    const response = await axios.get(query);
    return this.destructureLocationData(response.data);
  }

  // Destructure location data
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData[0].lat,
      lon: locationData[0].lon,
    };
  }

  // Build geocode query for fetching coordinates
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
  }

  // Build weather query based on coordinates
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`; // Use metric for Celsius
  }

  // Fetch and destructure location data
  private async fetchAndDestructureLocationData(
    city: string
  ): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return locationData;
  }

  // Fetch weather data based on coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    console.log({ query });

    const response = await axios.get(query);

    return this.parseWeatherData(response.data);
  }

  // Parse current weather from response
  // Parse weather data from the 5-day forecast response
  private parseWeatherData(response: any): [any, any[]] {
    console.log({ response });
    
const currentForecastDate = response.list[0]
    const currentForecast = {
      city: response.city.name,
      date: new Date(currentForecastDate.dt * 1000).toLocaleDateString(),
      icon :currentForecastDate.weather[0].icon,
      iconDescription:currentForecastDate.weather[0].description ,
      tempF: (currentForecastDate.main.temp * 9) / 5 + 32,
      windSpeed:currentForecastDate.wind.speed ,
      humidity:currentForecastDate.main.humidity,
    };
    // Parse forecast data (next 5 days)
    console.log(response.list, "response.list");
    
    const forecast = response.list
      .filter((_: any, index: number) => index % 8 === 0) // Approx 1 forecast per day (8 entries per day)
      .map((forecastData: any) => {
        const date = new Date(forecastData.dt * 1000).toLocaleDateString();
        const icon = forecastData.weather[0].icon;
        const iconDescription = forecastData.weather[0].description;
        const tempF = (forecastData.main.temp * 9) / 5 + 32; // Convert Celsius to Fahrenheit
        const windSpeed = forecastData.wind.speed;
        const humidity = forecastData.main.humidity;

        return {
          date,
          icon,
          iconDescription,
          tempF,
          windSpeed,
          humidity,
        };
      });

    return [currentForecast, forecast]; // Returning the Weather object and the forecast data
  }

  // Get weather for city
  async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    console.log({ coordinates });

    const currentWeather = await this.fetchWeatherData(coordinates);
    console.log({ currentWeather });

    // You might want to fetch forecast data here and populate the forecast in the Weather object
    // e.g., const forecastData = await this.fetchForecastData(coordinates);
    // currentWeather.forecast = this.buildForecastArray(currentWeather, forecastData);

    return currentWeather;
  }
}

export default new WeatherService();

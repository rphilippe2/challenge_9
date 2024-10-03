
# Weather Dashboard

## Description

The Weather Dashboard is a web application that provides users with current weather data and a 5-day weather forecast for their selected cities. The application uses the OpenWeatherMap API to fetch weather information based on city names, displaying both current conditions and forecast data.

## Features

- Get current weather details for any city.
- View a 5-day weather forecast.
- User-friendly interface with intuitive navigation.

## Technologies Used

- **Frontend**: React, JavaScript/TypeScript, Axios
- **Backend**: Node.js, Express, Axios
- **API**: OpenWeatherMap
- **Environment Variables**: dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```
   API_BASE_URL=https://api.openweathermap.org/data/2.5
   API_KEY=your_openweathermap_api_key
   ```

## Usage

1. Start the server:

   ```bash
   npm run start
   ```

2. The application will be running on `http://localhost:3000` (or your specified port).

3. Use a web browser or a tool like Postman to access the weather data:

   - To get the weather for a specific city, make a GET request to:

     ```
     http://localhost:3000/weather/{city}
     ```

   Replace `{city}` with the name of the city you want to query (e.g., `London`).

## API Information

The application communicates with the OpenWeatherMap API to fetch weather data. Below are the relevant endpoints:

### 1. Geocode API
- **Endpoint**: `https://api.openweathermap.org/geo/1.0/direct`
- **Parameters**:
  - `q`: City name
  - `limit`: Maximum number of results (1)
  - `appid`: Your API key

### 2. Weather API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/forecast`
- **Parameters**:
  - `lat`: Latitude of the city
  - `lon`: Longitude of the city
  - `appid`: Your API key
  - `units`: Metric (for Celsius)

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API.
- [Express](https://expressjs.com/) for the backend framework.
- [Axios](https://axios-http.com/docs/intro) for making HTTP requests.

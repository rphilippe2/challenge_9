import { Router } from "express";
const router = Router();

// Uncomment and import the necessary services
import HistoryService from "../../service/historyService.js";
import WeatherService from "../../service/weatherService.js";

router.post("/", async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    console.log(`Fetching weather data for: ${cityName}`);
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    console.log("Weather data received:", weatherData);

    await HistoryService.addCity(cityName);

    return res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error occurred while fetching weather data:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving weather data" });
  }
});


// GET search history
router.get("/history", async (_req, res) => {
  try {
    const history = await HistoryService.getCities(); // Renamed method
    return res.status(200).json(history); // Send the search history back to the client
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving search history" });
  }
});

// BONUS: DELETE city from search history
router.delete("/history/:id", async (req, res) => {
  const { id } = req.params; // Get the city ID from the request parameters

  try {
    const deleted = await HistoryService.removeCity(id); // Renamed method
    if (!deleted) {
      return res.status(404).json({ error: "City not found" }); // Handle not found case
    }
    return res.status(204).send(); // No content response on successful deletion
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the city from history",
    });
  }
});

export default router;

import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // Importing UUID for unique IDs
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
// Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// Complete the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, "../../db/db.json"); // Path to the JSON file
  }

  // Read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    console.log(this.filePath);

    try {
      const data = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(data) as City[];
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // File doesn't exist, return an empty array
        return [];
      } else {
        throw new Error("Error reading search history file");
      }
    }
  }

  // Write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    
    try {
      await fs.writeFile(
        this.filePath,
        JSON.stringify(cities, null, 2),
        "utf8"
      );
    } catch (error) {
      throw new Error("Error writing to search history file");
    }
  }

  // getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  public async getCities(): Promise<City[]> {
    return await this.read();
  }

  // addCity method that adds a city to the searchHistory.json file
  public async addCity(cityName: string): Promise<City> {
    if (!cityName || cityName.trim() === "") {
      throw new Error("City name cannot be empty");
    }

    const cities = await this.getCities();
    const city = new City(uuidv4(), cityName); // Generate a unique ID using uuid
    cities.push(city);
    await this.write(cities);
    return city;
  }

  // removeCity method that removes a city from the searchHistory.json file
  public async removeCity(id: string): Promise<boolean> {
    let cities = await this.getCities();
    const updatedCities = cities.filter((city) => city.id !== id);
    if (updatedCities.length === cities.length) {
      // City with the given ID was not found
      return false;
    }
    await this.write(updatedCities);
    return true;
  }
}

export default new HistoryService();

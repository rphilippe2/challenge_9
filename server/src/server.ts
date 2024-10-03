import dotenv from "dotenv";
import express from "express";
import path from "path"; // Import path module for serving static files
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
// Load environment variables from .env file
dotenv.config();

// Import the routes
import routes from "./routes/index.js";

const app = express();

// Define the port
const PORT = process.env.PORT || 3001;

// Serve static files from the client dist folder
app.use(express.static(path.join(__dirname, "client/dist"))); // Adjust the path based on your project structure

// Middleware for parsing JSON and urlencoded form data
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// Connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// Define route to serve index.html
router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../../client/dist/index.html")); // Adjust the path based on your project structure
});

// Optional: Define a catch-all route to serve index.html for all other routes (for client-side routing)
router.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../../client/dist/index.html")); // Redirect to index.html for unknown routes
});

export default router;

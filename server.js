import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import { fileURLToPath } from "url";
import foodRoute from "./routes/food.js";
import orderRoute from "./routes/order.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 8080;
const BACKEND_URL = process.env.BACKEND_URL;

// Needed to get the current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ImagePath = path.join(__dirname, "/public/images/");

console.log(ImagePath);

app.use("/images", express.static(ImagePath));

app.use("/api/food", foodRoute);

app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  console.log(`Listening from ${BACKEND_URL}:${PORT}`);
});

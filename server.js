import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { fileURLToPath } from "url";
import foodRoute from "./routes/food.js";
import orderRoute from "./routes/order.js";
import cartRoute from "./routes/cart.js";
import trackOrderRoute from "./routes/trackOrder.js";
import loginRoute from "./routes/login.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(express.json()); 
app.use(cookieParser());

const PORT = process.env.PORT ?? 8080;
const BACKEND_URL = process.env.BACKEND_URL;

//Authentication Middleware
const authMiddle = (req, res, next) =>{
  const jwtToken = req.cookies['jwtToken'];
  console.log("JWT Token from cookie: ", jwtToken);
  
  if(!jwtToken){
    return res.status(401).send("Unauthorized Access - No Token");
  }
   
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) =>{
    if(err){
       return res.status(401).send("Unauthorized Access - Invalid Token");
    }else{
      req.user = decoded;
      console.log("Decoded User: ", decoded);
      next();
    }
});
}

// Needed to get the current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ImagePath = path.join(__dirname, "/public/Images/");

console.log(ImagePath);

app.use("/google/auth", loginRoute);

app.use("/images", express.static(ImagePath));

app.use("/api/food", foodRoute);

app.use("/api/order", authMiddle, orderRoute);

app.use("/api/cart", authMiddle, cartRoute);

app.use("/api/trackOrder", authMiddle, trackOrderRoute);

app.listen(PORT, () => {
  console.log(`Listening from ${BACKEND_URL}:${PORT}`);
});

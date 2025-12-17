import express from "express";
import "dotenv/config";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import {userCheck} from "../controllers/login-controller.js"; 
import jwt from "jsonwebtoken";

const loginRoute = express.Router();

const redirectUri = "http://localhost:5050/google/auth";
    const client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectUri);
    

loginRoute.route("/").post(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Referrer-Policy", "no-referrer-when-downgrade");
    const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/userinfo.profile",
             "https://www.googleapis.com/auth/userinfo.email", "openid"],
             prompt: "consent"
    }); 

    res.json({ url: authUrl });
}).get(async (req, res, next) => {
    const code = req.query.code;
  try{
    const response = await client.getToken(code);
    const tokens = response.tokens;
    
    // Set the credentials to the client to access Google APIs,
    // to keep session alive using referesh token,
    // to access google apis on behalf of the user
    // if needed
    await client.setCredentials(tokens);
    const credentials = client.credentials;

    //console.log("Tokens", tokens, " \nCredentails: ",credentials);

    // Get user info
    await getUserInfo(tokens.access_token);
    const jwtToken = await verifyToken(tokens.id_token);

    res.cookie("jwtToken", jwtToken, {httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 3600000}); // 1 hour

    return res.redirect("http://localhost:5173/Home");
  }

  catch(error){
    console.log("Error getting user info: ", error);
  }
  
});

const getJWTToken = (userId, email) =>{
  return jwt.sign({userid: userId, emailid : email}, process.env.JWT_SECRET, {expiresIn: '1h'});
}

async function verifyToken(token){
  try{
   const ticket = await client.verifyIdToken({
    idToken : token,
    audience: process.env.CLIENT_ID
   })
   const payload = ticket.getPayload();

   //Check if user exists in DB, if not add the user
   const userId = await userCheck(payload.email, payload.given_name, payload.family_name);
   const jwtToken = getJWTToken(userId, payload.email);
   return jwtToken;

  }catch(error){
    console.log("Error verifying token:", error)
  }

}

async function getUserInfo(access_token) {

    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`);
    const data = await response.data;
    //console.log(data);
    return data;
};

export default loginRoute
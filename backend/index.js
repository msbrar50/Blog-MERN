import express from "express";

import dotenv from "dotenv"
import connectDB from "./database/db.js";
import { User } from "./models/user_model.js";

import userRoute from "./routes/user_routes.js"

dotenv.config()
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const PORT =process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Server is running!");
  });

app.use("/api/v1/user",userRoute)

app.listen(3000,
    () => {
        connectDB()
        console.log("server start!");
    }
)
import express from "express";

import dotenv from "dotenv"
import connectDB from "./database/db.js";
import { User } from "./models/user_model.js";

import userRoute from "./routes/user_routes.js"

import blogRouter from "./routes/blog_routes.js";



import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const PORT =process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Server is running!");
  });

app.use("/api/v1/user",userRoute)



app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve images
app.use("/api/v1/blog", blogRouter);



app.listen(3000,
    () => {
        connectDB()
        console.log("server start!");
    }
)
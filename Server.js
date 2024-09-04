import express from "express";
import dotenv from "dotenv";
import DBconnection from "./Utilities/dbConnection.js";
import Router from "./Routes/UserRoutes.js";
import productRouter from "./Routes/ProductRoute.js";

const app = express();

// Configure .env file
dotenv.config({path: './Utilities/.env'})

//Middleware
app.use(express.json())


//DataBase Connection
DBconnection()

//Api

app.use("/api/v1/user", Router);  // User 
app.use("/api/v1/product", productRouter) //product



app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}` )
})
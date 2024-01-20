import express from "express";
import dotenv from 'dotenv';
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

//routes import
import router1 from "./routes/testRoutes.js";
import router2 from "./routes/authRoutes.js";
import router3 from "./routes/inventoryRoutes.js";
import router4 from "./routes/analyticsRoutes.js";
import router5 from "./routes/adminRoutes.js";

//dotenv config
dotenv.config();

//mongoDB connection config
connectDB();

// rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//port
const PORT = process.env.PORT || 8080;

//routes
app.use("/test",router1);
app.use("/auth",router2);
app.use("/inventory",router3);
app.use("/analytics",router4);
app.use("/admin", router5);

//listen
app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.DEV_MODE} mode on Port ${PORT} `.bgBlue.white);
})
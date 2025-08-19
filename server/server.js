import express from "express"; 
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./config/db.js";
                                                           
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4000; 

// Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());


app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

await connectDB();
app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});

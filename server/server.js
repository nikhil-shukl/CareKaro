import express from "express"; 
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./config/db.js";
// import cloudinary from "./config/cloudinary.js"; 
import scanReportRoutes from "./routes/scanReportRoutes.js"; 
import askHelpRoutes from "./routes/askHelpRoutes.js";


                                                           
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4000; 


// Middleware setup
app.use(express.json({limit: "10mb"}));
app.use(cors());


app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/scan-report", scanReportRoutes);
app.use("/api/askhelp", askHelpRoutes);


await connectDB();

if(process.env.NODE_ENV !== "production"){
    const PORT = process.env.PORT || 1000;
    app.listen(PORT, ()=> console.log("Server is running on PORT: " + PORT));
}

export default app;
import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from"dotenv";
import connectDB from './utils/db.js';
import userRoute from './routes/userRoutes.js'
import companyRoute from './routes/companyRoutes.js'
import jobRoute from './routes/jobRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'
dotenv.config();
const app=express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

app.use("/api/user",userRoute);
app.use("/api/company",companyRoute);
app.use("/api/job",jobRoute);
app.use("/api/application",applicationRoutes);

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`)
})
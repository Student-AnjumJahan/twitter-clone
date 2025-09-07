import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";


import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js"
import notificationRoutes from "./routes/notification.route.js";


import connectDB from "./db/connectMongoDb.js";


dotenv.config();


import {v2 as cloudinary} from "cloudinary"
cloudinary.config({
    cloud_name: process.env.CLOUDINRAY_CLOUD_NAME,
    api_key: process.env.CLOUDINRAY_API_KEY,
    api_secret: process.env.CLOUDINRAY_API_SECRET,
})

const app = express();



app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDB();
})
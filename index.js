import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userGlucoseRouter from "./routes/userGlucoseRoute.js";

const app = express();
const port = 5000;

configDotenv();

// Middleware untuk parsing body request
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user-glucose", userGlucoseRouter);

// Koneksi ke MongoDB
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Koneksi ke MongoDB gagal:", error);
    process.exit(1); // Keluar dari proses jika koneksi gagal
  }
}

app.get('/', (req, res) => {
  res.send('Welcome to GlucoGuardian API');
});

// Memanggil fungsi koneksi dan memulai server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(console.dir);

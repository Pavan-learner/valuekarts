import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import axios from "axios";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import vechicleRoutes from './routes/vechicleRoute.js'
import sectionRoutes  from './routes/sectionRoutes.js'
import labourRoutes from './routes/labourRoutes.js'
import cartRoutes from './routes/cartRoutes.js'

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from your Node.js backend!');
});

// Default routes
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/category", categoryRoutes);
app.use("/api/v2/products", productRoutes);
app.use("/api/v2/mail", mailRoutes);
app.use("/api/v2/order", orderRoutes);
app.use("/api/v2/event", eventRoutes);
app.use('/api/v2/vehicle',vechicleRoutes);
app.use('/api/v2/section',sectionRoutes);
app.use('/api/v2/labour',labourRoutes);

// * this route is for manging the cart actions.
app.use('/api/v2/cart',cartRoutes)

const PORT = process.env.PORT || 8080;

// * for decoding the cordinates
app.post("/api/v2/location/reverse-geocode", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    if (response.data) {
      res.json({ address: response.data.display_name });
    } else {
      res.status(404).json({ error: "No address found for this location" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
});

// * listening to the port
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});

connectDB();

import express from "express";
import cors from "cors";
import { db } from "./db.js";
import playerRoutes from "./routes/playerRoutes.js";
import characterRoutes from "./routes/characterRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/players", playerRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/items", itemRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cors = require('cors');
const express = require("express");
const app = express();
const connectDB = require('./config/db')

app.use(express.json());
connectDB()
const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

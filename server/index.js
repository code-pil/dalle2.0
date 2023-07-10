const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connect.js");

const postRoutes = require("./routes/postRoutes.js");
const dalleRoutes = require("./routes/dalleRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/api/v1", authRoutes);

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT || 8080, () =>
      console.log("Server is running on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

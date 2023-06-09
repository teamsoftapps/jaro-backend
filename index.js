const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const csvRoutes = require("./routes/csvRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    method: "GET,POST,PUT,PATCH,DELETE",
    credentias: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hellow from Express App...",
  });
});

app.use("/api/uploadCsv", csvRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

const mongodbUri =
  "mongodb+srv://jaro-admin:0YjGozxwl2inNEnl@cluster0.pdsddkf.mongodb.net/test";
// "mongodb://127.0.0.1:27017/jaro";

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

app.listen(process.env.PORT || 4001, () => {
  console.log("App is running on PORT 4001");
});

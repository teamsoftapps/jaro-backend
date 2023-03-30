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

app.use("/api/uploadCsv", csvRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

const mongodbUri =
  "mongodb+srv://muneebwaseem78:IudX3XDNED0oFmRA@cluster0.pdsddkf.mongodb.net/test";

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

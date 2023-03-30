const express = require("express");
const csvController = require("../controllers/csvController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const adminMiddleware = require("../middleware/adminMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/csv")) {
      fs.mkdirSync("public/csv");
    }

    cb(null, "public/csv");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".csv") {
      return cb(new Error("Only csvs are allowed!"));
    }

    cb(null, true);
  },
});

const router = express.Router();

//post create new media
router.post("/create", upload.single("csvFile"), csvController.create);
router.post("/login", csvController.loginUser);
router.post("/appLogin", csvController.appLoginOrderNumber);
router.patch("/driverLocation", csvController.driverLocation);
router.get("/getAllUsers", csvController.getAllUsersData);

module.exports = router;

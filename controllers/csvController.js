const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const User = require("../Models/User");

exports.create = async (req, res) => {
  console.log(req.body);
  const totalRecords = [];
  try {
    console.log(
      path.join(__dirname, "../", "/public/csv/" + req.file.filename)
    );
    fs.createReadStream(
      path.join(__dirname, "../", "/public/csv/" + req.file.filename)
    )
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", (row) => totalRecords.push(row))
      .on("end", async (rowCount) => {
        try {
          const users = await User.insertMany(totalRecords);

          res.json(users);
        } catch (err) {
          res.status(400).json(err);
        }
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAllUsersData = async (req, res) => {
  const usersData = await User.find();

  if (!usersData) {
    res.status(404).json({
      status: "failed",
      message: "No data found!",
    });
  }

  res.status(200).json({
    status: "success",
    data: usersData,
  });
};

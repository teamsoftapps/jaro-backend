const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const User = require("../Models/User");
const { resolve } = require("dns/promises");
const sendEmail = require("../utils/sendEmail");
const { update } = require("../Models/User");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      res.status(400).json({
        status: "failed",
        message: "Email must not be empty",
      });
    } else if (!password) {
      res.status(400).json({
        status: "failed",
        message: "Password must not be empty",
      });
    } else if (email === "jarotransport8080@gmail.com") {
      const adminUser = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            role: "admin",
          },
        }
      );

      if (adminUser) {
        if (adminUser.password === password) {
          res.status(201).json({
            status: "success",
            data: adminUser,
          });
        } else {
          res.status(403).json({
            status: "failed",
            message: "Incorrect Username or Password",
          });
        }
      }
    } else if (email !== "jarotransport8080@gmail.com") {
      res.status(403).json({
        status: "failed",
        message: "Incorrect Username or Password",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.appLoginOrderNumber = async (req, res) => {
  const { orderNumber, password } = req.body;
  if (!orderNumber) {
    res.status(401).json({
      status: "failed",
      message: "No order no found!",
    });
  } else if (!password) {
    res.status(401).json({
      status: "failed",
      message: "Password cannot be empty!",
    });
  } else if (orderNumber) {
    const driver = await User.findOne({ orderNumber });
    if (!driver) {
      res.status(401).json({
        status: "failed",
        message: "No order no found!",
      });
    }

    res.status(201).json({
      status: "success",
      data: driver,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  const adminExists = await User.findOne({ email });

  console.log("admin Exists", req.body);

  if (adminExists) {
    const link = `http://localhost:3000/authentication/resetPassword`;
    sendEmail(adminExists.email, link);

    res.status(201).json({
      status: "success",
      message: "Reset Password link has been sent to your email",
      admin: adminExists,
    });
  } else {
    res.status(400).json({
      status: "failed",
      message: "No user exist with this email",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const admin = await User.findOne({ email });

    if (admin.password === oldPassword) {
      const updatePassword = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            password: newPassword,
          },
        },
        { new: true }
      );

      res.status(201).json({
        status: "success",
        message: "Your password has been updated!",
        data: updatePassword,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Cannot find user",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.driverLocation = async (req, res) => {
  const { orderNumber, driverCoordinates } = req.body;

  try {
    const driverLocation = await User.findOneAndUpdate(
      orderNumber,
      { driverCoordinates: driverCoordinates },
      { new: true }
    );

    if (driverLocation) {
      res.status(201).json({
        status: "success",
        message: "Driver Location updated",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.create = async (req, res) => {
  console.log(req.file);
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

  const filterUsers = usersData.filter(
    (users) => users.email !== "jarotransport8080@gmail.com"
  );

  res.status(200).json({
    status: "success",
    data: filterUsers,
  });
};

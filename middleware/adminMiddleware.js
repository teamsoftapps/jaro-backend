const adminMiddleware = async (req, res) => {
  if (req.user.email !== "jarotransport80@gmail.com") {
    res.status(404).json({
      status: "failed",
      message: "You are not an admin!",
    });
  }
};

module.exports = adminMiddleware;

const express = require("express");
const User = require("../db/userModel");

const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name");
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user list" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id,
      "_id first_name last_name location description occupation"
    );
    if (!user) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
});

module.exports = router;

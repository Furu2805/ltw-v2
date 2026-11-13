const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "_id");
    if (!user) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const photos = await Photo.find(
      { user_id: user._id },
      "_id user_id comments file_name date_time"
    ).populate("comments.user_id", "_id first_name last_name");

    const responsePhotos = photos.map((photo) => ({
      _id: photo._id,
      user_id: photo.user_id,
      file_name: photo.file_name,
      date_time: photo.date_time,
      comments: photo.comments.map((comment) => ({
        _id: comment._id,
        comment: comment.comment,
        date_time: comment.date_time,
        user: comment.user_id
          ? {
              _id: comment.user_id._id,
              first_name: comment.user_id.first_name,
              last_name: comment.user_id.last_name,
            }
          : null,
      })),
    }));

    return res.json(responsePhotos);
  } catch (error) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
});

module.exports = router;

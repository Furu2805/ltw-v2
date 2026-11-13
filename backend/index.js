const express = require("express");
const cors = require("cors");
const models = require("./modelData/models");

const app = express();
const port = 8081;

app.use(cors());

app.get("/test/info", (request, response) => {
  response.json(models.schemaInfo());
});

app.get("/user/list", (request, response) => {
  const users = models.userListModel().map(({ _id, first_name, last_name }) => ({
    _id,
    first_name,
    last_name,
  }));

  response.json(users);
});

app.get("/user/:id", (request, response) => {
  const user = models.userModel(request.params.id);
  if (!user) {
    return response.status(400).json({ message: "Invalid user ID" });
  }

  const { _id, first_name, last_name, location, description, occupation } = user;
  return response.json({
    _id,
    first_name,
    last_name,
    location,
    description,
    occupation,
  });
});

app.get("/photosOfUser/:id", (request, response) => {
  const user = models.userModel(request.params.id);
  if (!user) {
    return response.status(400).json({ message: "Invalid user ID" });
  }

  const photos = models.photoOfUserModel(request.params.id).map((photo) => ({
    _id: photo._id,
    user_id: photo.user_id,
    file_name: photo.file_name,
    date_time: photo.date_time,
    comments: (photo.comments || []).map((comment) => ({
      _id: comment._id,
      comment: comment.comment,
      date_time: comment.date_time,
      user: comment.user
        ? {
            _id: comment.user._id,
            first_name: comment.user.first_name,
            last_name: comment.user.last_name,
          }
        : null,
    })),
  }));

  return response.json(photos);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Photo sharing API listening on port ${port} (local seed data)`);
});

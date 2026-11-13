const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const SchemaInfo = require("./db/schemaInfo");

const app = express();

dbConnect();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/test/info", async (request, response) => {
  try {
    const schemaInfo = await SchemaInfo.findOne({}, "_id __v load_date_time");
    if (!schemaInfo) {
      return response.status(404).json({ message: "Schema info not found" });
    }
    return response.json(schemaInfo);
  } catch (error) {
    return response.status(500).json({ message: "Failed to fetch schema info" });
  }
});

app.use("/user", UserRouter);
app.use("/photosOfUser", PhotoRouter);

app.listen(8081, () => {
  console.log("server listening on port 8081");
});

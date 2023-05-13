require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is connected..."))
  .catch((err) => console.log(err));

//db schema
const userSchema = mongoose.Schema({
  name: String,
  lastName: String,
});

//db model
const User = new mongoose.model("User", userSchema);

app.get("/get-users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

app.post("/create", (req, res) => {
  //save to mongodb and send response
  const newUser = new User({
    name: req.body.name,
    lastName: req.body.lastName,
  });

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});

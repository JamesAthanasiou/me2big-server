require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const errorHandler = require("./utils/error");
const authRoutes = require("./routes/auth");
const { loginRequired, ensureCorrectUser } = require("./utils/auth");
const foodRoutes = require("./routes/food");

const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server has started");
});
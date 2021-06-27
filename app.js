const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./Models/userModel");
const bodyParse = require("body-parser");
const routes = require("./Routes/router.js");
require("dotenv").config({
  path: path.join(__dirname, "./.env"),
})

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Mongo DB Connected`);
  });

app.use(bodyParse.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParse.json());
app.use(routes);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, exp } = jwt.verify(accessToken, process.env.JWT_SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "JWT token has expired, please login to obtain a new one",
      });
    }
    res.locals.loggedInUser = await User.findById(userId);
    next();
  } else {
    next();
  }
});

app.use("/", routes);
app.listen(PORT, () =>
  console.log(
    `Server listening in:: ${process.env.NODE_ENV} mode on port:: ${PORT}`
  )
);

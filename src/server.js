const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

// Requiring middlewares from the middlewares.js export
const middlewares = require("./middlewares");

const logs = require("./api/logs");

const app = express();

// process.env.DATABASE_URL
mongoose
  .connect("mongodb://localhost/travel-log", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   // we're connected!
// });

app.use(morgan("common"));
// securing app by preventing hackers from knowing what headers are being used.
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello world!",
  });
});

app.use("/api/logs", logs);

// Middlewares
// Not found middleware
app.use(middlewares.notFound);
// Error handling middleware
app.use(middlewares.errorHandler);

// Server port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

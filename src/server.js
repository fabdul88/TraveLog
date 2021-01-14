const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

// Requiring middlewares from the middlewares.js export
const cors = require("cors");
const middlewares = require("./middlewares");

const logs = require("./api/logs");

const app = express();

// Body parser
app.use(express.json());

require("dotenv").config();

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

mongoose.connection.once("open", () => {
  console.log("mongoDB connection successful");
});

app.use(morgan("common"));
// securing app by preventing hackers from knowing what headers are being used.
app.use(helmet());
app.use(cors());

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

// Requiring middlewares from the middlewares.js export
const cors = require("cors");
// const middlewares = require("./middlewares");

const logs = require("./api/logs");

const app = express();

// Body parser
app.use(express.json());

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

// app.get("/", (req, res) => {
//   res.json({
//     message: "hello world!",
//   });
// });

app.use("/api/logs", logs);

// // Middlewares
// // Not found middleware
// app.use(middlewares.notFound);
// // Error handling middleware
// app.use(middlewares.errorHandler);

// deployment
if (process.env.NODE_ENV === "production") {
  // set static folder
  const path = require("path");
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

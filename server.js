const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Middleware
const cors = require("cors");

require("dotenv").config();
const logs = require("./api/logs");

const app = express();

// Body parser
app.use(express.json());

// MongoDB Connection
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
app.use(cors());

app.use("/api/logs", logs);

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

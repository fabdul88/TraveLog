const { Router } = require("express");

const LogEntry = require("../model/LogEntry");

const { API_KEY } = process.env;

const router = Router();

// get all travel entries
router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

// post travel entry
router.post("/", async (req, res, next) => {
  try {
    if (req.get("x-api-key") !== API_KEY) {
      res.status(401);
      throw new Error("UnAuthorized");
    }
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === "validationError") {
      res.status(422);
    }
    next(error);
  }
});

// update logged entry
router.post("/:id", async (req, res) => {
  await LogEntry.findById(req.params.id)
    .then((entry) => {
      entry.title = req.body.title;
      entry.description = req.body.description;
      entry.comments = req.body.comments;
      entry.image = req.body.image;
      entry.rating = req.body.rating;
      entry.latitude = req.body.latitude;
      entry.longitude = req.body.longitude;
      entry.visitDate = req.body.visitDate;

      entry
        .save()
        .then(res.json("updated"))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

// delete logged entry
router.delete("/:id", async (req, res) => {
  await LogEntry.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;

const { Router } = require("express");

const router = Router();
const LogEntry = require("../model/LogEntry");

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
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

// router.post("/:id", async (req, res, next) => {
//   try {
//     LogEntry.findById(req.params.id);
//     const logUpdate = await LogEntry.then((logentry) => {
//       logentry.title = req.body.title;
//       logentry.description = req.body.description;
//       logentry.comments = req.body.comments;
//       logentry.image = req.body.image;
//       logentry.rating = req.body.rating;
//       logentry.latitude = req.body.latitude;
//       logentry.longitude = req.body.longitude;
//       logentry.visitDate = req.body.visitDate;
//     });

//     const updatedLog = await logUpdate.save();
//     res.json(updatedLog);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/:id", (req, res, next) => {
  LogEntry.findById(req.params.id)
    .then((logentry) => {
      logentry.title = req.body.title;
      logentry.description = req.body.description;
      logentry.comments = req.body.comments;
      logentry.image = req.body.image;
      logentry.rating = req.body.rating;
      logentry.latitude = req.body.latitude;
      logentry.longitude = req.body.longitude;
      logentry.visitDate = req.body.visitDate;

      logentry
        .save()
        .then(res.json("updated"))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});
module.exports = router;

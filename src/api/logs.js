const { Router } = require("express");

const router = Router();
const LogEntry = require("../model/LogEntry");

router.get("/", (req, res) => {
  res.json({
    message: "🌎",
  });
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
module.exports = router;

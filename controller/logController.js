const LogEntryModel = require('../model/LogEntry');

const API_KEY = process.env.REACT_APP_API_KEY;

// get all travel entries
exports.getLogEntries = async (req, res, next) => {
  try {
    const entries = await LogEntryModel.find();
    return res.status(200).json(entries);
  } catch (error) {
    next(error);
  }
};

// post travel entry
exports.postLogEntry = async (req, res, next) => {
  try {
    if (req.get('x-api-key') !== API_KEY) {
      res.status(401);
      throw new Error('UnAuthorized');
    }
    const logEntry = new LogEntryModel(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'validationError') {
      res.status(422);
    }
    next(error);
  }
};

// update logged entry
exports.editLogEntry = async (req, res) => {
  await LogEntryModel.findById(req.params.id)
    .then((entry) => {
      entry.title = req.body.title;
      entry.description = req.body.description;
      entry.comments = req.body.comments;
      entry.image = req.body.image;
      entry.rating = +req.body.rating;
      entry.latitude = req.body.latitude;
      entry.longitude = req.body.longitude;
      entry.visitDate = req.body.visitDate;

      entry
        .save()
        .then(res.status(200).json('updated'))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
};

// delete logged entry
exports.deleteLogEntry = async (req, res) => {
  // console.log(req);
  await LogEntryModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('deleted'))
    .catch((err) => res.status(400).json(err));
};

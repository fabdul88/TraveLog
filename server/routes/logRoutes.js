const router = require('express').Router();
const logController = require('../controller/logController');

router.get('/', logController.getLogEntries);
router.post('/', logController.postLogEntry);
router.put('/:id', logController.editLogEntry);
router.delete('/:id', logController.deleteLogEntry);

module.exports = router;

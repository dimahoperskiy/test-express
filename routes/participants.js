var express = require('express');
var router = express.Router();
const Participant = require('../models/participant')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const participants = await Participant.find()
    res.json(participants)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res, next) => {
  const participant = new Participant({name: req.body.name})
  try {
    const newParticipant = await participant.save()
    res.json(newParticipant)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
const Promo = require('../models/promo')
const Participant = require('../models/participant')
const Prize = require('../models/prize')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const promos = await Promo.find({}, 'name description').exec()
    res.json(promos)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const promo = await Promo.findById(req.params.id).populate('participants prizes')
    res.json(promo)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res, next) => {
  const promo = new Promo({
    name: req.body.name,
    description: req.body.description
  })
  try {
    const newPromo = await promo.save()
    res.json(newPromo._id)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const promo = await Promo.findById(req.params.id)
    if (req.body.name != null) {
      promo.name = req.body.name
    }
    promo.description = req.body.description
    await promo.save()
    res.json({message: 'Promo updated'})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Promo.deleteOne({_id: req.params.id})
    res.json({message: 'Promo deleted'})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/:id/participant', async (req, res, next) => {
  const participant = new Participant({
    name: req.body.name,
  })
  try {
    const newParticipant = await participant.save()
    await Promo.findByIdAndUpdate(req.params.id, {
      $push: {
        participants: {
          _id: newParticipant._id,
          name: newParticipant.name
        }
      },
    }, {new: true, useFindArdModify: false})
    res.json(newParticipant._id)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:promoId/participant/:participantId', async (req, res, next) => {
  try {
    await Participant.deleteOne({_id: req.params.participantId})
    res.json({message: 'Participant deleted'})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/:id/prize', async (req, res, next) => {
  const prize = new Prize({
    description: req.body.description,
  })
  try {
    const newPrize = await prize.save()
    await Promo.findByIdAndUpdate(req.params.id, {
      $push: {
        prizes: {
          _id: newPrize._id,
          description: newPrize.description
        }
      },
    }, {new: true, useFindArdModify: false})
    res.json(newPrize._id)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:promoId/prize/:prizeId', async (req, res, next) => {
  try {
    await Prize.deleteOne({_id: req.params.prizeId})
    res.json({message: 'Prize deleted'})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

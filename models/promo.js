const mongoose = require('mongoose')

const promoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    prizes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prize'
    }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant'
    }],
}, { versionKey: false })

module.exports = mongoose.model('Promo', promoSchema)
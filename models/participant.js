const mongoose = require('mongoose')

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { versionKey: false })

module.exports = mongoose.model('Participant', participantSchema)
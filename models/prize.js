const mongoose = require('mongoose')

const prizeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
}, { versionKey: false })

module.exports = mongoose.model('Prize', prizeSchema)
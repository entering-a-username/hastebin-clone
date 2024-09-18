const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        default: Date.now,
    },
    history: [{
        value: String,
        timestamp: {type: Date, default: Date.now}
    }]
}, {timestamps: true})

module.exports = mongoose.model("Document", documentSchema);
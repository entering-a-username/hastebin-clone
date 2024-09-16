const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        // default
    }
})

module.exports = mongoose.model("Document", documentSchema);
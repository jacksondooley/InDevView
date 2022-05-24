const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    document_text: {
        type: String,
    }
})

module.exports = Document = mongoose.model("Document", DocumentSchema)
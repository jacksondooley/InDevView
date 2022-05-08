const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }, password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema)
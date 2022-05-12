const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    host_id: {
			type: String,
			require: true
		},
		room_key: {
			type: Number,
			require: true
		},
		interviewers: {
			type: Array,
			require: true
		},
		participants: {
			type: Array,
			require: true
		},
		interviewees: {
			type: Array,
			require: false
		},
		questions: {
			type: Array,
			require: true
		},
    date: {
			type: Date,
			default: Date.now
	}
});

module.exports = Room = mongoose.model('Room', RoomSchema);


const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
		// creator_id: {
		// 	type: String,
		// 	require: true
		// },
    title: {
			type: String,
			require: true
		},
    description: {
			type: String,
			require: true
		},
		template: {
			type: String,
			require: true
		},
    solution: {
			type: String,
			require: true
		},
    difficulty: {
			type: Number,
			require: true
		},
    date: {
			type: Date,
			default: Date.now
		},
	codeLine: {
			type: String,
			require: true
		},
	inputs: {
			type: Array,
			require: true
		},
	inputs2: {
			type: Array
		},
	solutions: {
			type: Array,
			require: true
		}
});

module.exports = Question = mongoose.model('Question', QuestionSchema);

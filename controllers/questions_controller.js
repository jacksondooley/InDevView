const Question = require("../models/Question");
const User = require("../models/User");

const createQuestion = (req, res) => {
	const newQuestion = new Question({
			// creator_id: req.user.id,
			title: req.body.title,
			description: req.body.description,
			template: req.body.template,
			solution: req.body.solution,
			difficulty: req.body.difficulty
	});

	newQuestion.save()
			.then((newQuestion) => res.json(newQuestion));
};


const fetchAllQuestions = (req, res) => {
	Question.find()
		.then(questions => res.json(questions))
		.catch(err => res.status(404).json({ noquestionsfound: 'No questions found'}))
}

const fetchQuestion = (req, res) => {
	Question.find({ _id: req.params.questionId }, (err, question) => {
		if (err) {console.log(`this question does not exist`)}
		else {
			if (!question.length) {console.log(`question not found`)}
			else {
				res.json(question)
			}
		}
	})
}

const destroyQuestion = (req, res) => {
	Question.deleteOne({ _id: req.params.questionId }, (err, destroyedquestion) => {
		console.log(`req: ${req}`);
		console.log(`req.body.questionId: ${req.body.questionId}`)
		if (err) {console.log(`could not delete question`)}
		else {
			console.log(`question successfully destroyed`)
			res.json(
				destroyedquestion
			)
		}
	})
}

module.exports = {
	createQuestion,
	fetchAllQuestions,
	fetchQuestion,
	destroyQuestion
};

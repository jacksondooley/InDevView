const Question = require("../models/Question");
const User = require("../models/User");

const createQuestion = (req, res) => {
	const newQuestion = new Question({
			creator_id: req.user.id,
			title: req.body.title,
			description: req.body.description,
			template: req.body.template,
			solution: req.body.solution,
			difficulty: req.body.difficulty
	});

	newQuestion.save()
			.then((newQuestion) => res.json(newQuestion));
};

module.exports = {
    createQuestion
};

// const fetchRoom = (req, res) => {
// 	const room
// }

// {
// 	title: "Doubler",
// 	description: "Write a function that takes in a number as an argument and doubles that number",
// 	template: "doubler(5) // 10",
// 	solution: "input * 2",
// 	difficulty: 1
// }
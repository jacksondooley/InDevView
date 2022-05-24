 const mongoose = require('mongoose');
 const Question = require('../models/Question');
 const db = require('../config/keys').mongoURI;

 mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


const seedQuestions = [
	{
		title: "square root",
		description: "Given a non-negative integer (x), find the square root of x, rounded down to the nearest integer",
		template: 'function sqRoot(x){\n\t\n}',
		solution: 'function sqRoot(x){\n\treturn Math.floor(x ** (1 / 2));\n}',
		difficulty: 1,
		codeLine: '\nconst func = sqRoot',
        inputs: [4, 8, 576],
        solutions: [2, 2, 24]
	},
	{
		title: 'doubler',
		description: "Given an integer (x), return the number that is double of x",
		template: 'function doubler(x){\n\t\n}',
		solution: 'function doubler(x){\n\treturn x * 2;\n}',
		difficulty: 1,
		codeLine: '\nconst func = doubler',
        inputs: [12, 31, 0],
        solutions: [24, 62, 0]
	},
	{
		title: 'titleize',
		description: 'Given a string containing at least one word, captialize the first letter of each word in the string',
		template: 'function titleize(str){\n\t\n}',
		solution: '',
		difficulty: 2,
		codeLine: '\nconst func = titlelize',
        inputs: ["indevview", "expired nuts", "app academy is okay"],
        solutions: ["Indevview", "Expired Nuts", "App Academy Is Okay"]
	},
	{
		title: 'merge sort',
		description: 'Given an array of integers, sort the array in ascending order in O(n log(n)) time',
		template: 'function mergeSort(arr){\n\t\n}',
		solution: '',
		difficulty: 3,
		codeLine: '\nconst func = mergeSort',
        inputs: [[4,2,1,3], [5, 1, 4], []],
        solutions: [[1,2,3,4], [1,4,5],[]]
	},
	{
		title: 'palindrome',
		description: 'Given a string, return true if the string is a palindrome',
		template: 'function palindrome(str){\n\t\n}',
		solution: '',
		difficulty: 2,
		codeLine: '\nconst func = palindrome',
		inputs: ["abba", "deced", "hello"],
		solutions: [true, true, false]
	},
	{
		title: "valid parentheses",
		description: 'Given a string that only contains (), {}, and [], determine if the input string is valid, in which open brackets must be closed by the same brackets and brackets must closed in the correct order',
		template: 'function validParentheses(str){\n\t\n}',
		solution: '',
		difficulty: 3,
		codeLine: '\nconst func = validParentheses',
		inputs: ["()", "()[]{}", "(]"],
		solutions: [true, true, false]
	},
	{
		title: "yell",
		description: 'Given an array of strings, return an array of strings in which every string in the original array has an ! after it',
		template: 'function yell(arr){\n\t\n}',
		solution: '',
		difficulty: 1,
		codeLine: '\nconst func = yell',
		inputs: [["hello", "world"], ["I", "am", "awesome"], ["help"]],
		solutions: [["hello!", "world!"], ["I!", "am!", "awesome!"], ["help!"]]
	},
	{
		title: "fizz buzz",
		description: "Given an integer, return an array containing all of the integers from 1 to the given integer that are divisible by 3 or 5, but not both",
		template: 'function fizzBuzz(num){\n\t\n}',
		solution: '',
		difficulty: 1,
		codeLine: '\nconst func = fizzBuzz',
		inputs: [5, 11, 20],
		solutions: [[3, 5], [3, 5, 6, 9, 10], [3, 5, 6, 9, 10, 12, 18, 20]]
	},
	{
		title: "valid name",
		description: "Given a string, check if it contains a first and last name, which are both capitalized and are separated by a space",
		template: 'function validName(str){\n\t\n}',
		solution: '',
		difficulty: 2,
		codeLine: '\nconst func = validName',
		inputs: ["Jackson Dooley", "Will Corona", "Spencer"],
		solutions: [true, true, false]
	},
	{
		title: "reverse words",
		description: "Given a string, return a string with the order of the characters of the original string reversed. However, the order of the words in the string remains the same",
		template: 'function reverseWords(str){\n\t\n}',
		solution: '',
		difficulty: 2,
		codeLine: '\nconst func = reverseWords',
		inputs: ["hello", "App Academy", "simplicity is prerequisite for reliability"],
		solutions: ["olleh", "ppA ymedacA", "yticilpmis si etisiuqererp rof ytilibailer"]
	},
	{
		title: "plus one",
		description: "Given an array of integers that represent digits of an integer, return an array of integers that represent the digits of the resulting integer after adding one to the original integer",
		template: 'function plusOne(arr){\n\t\n}',
		solution: '',
		difficulty: 2,
		codeLine: '\nconst func = plusOne',
		inputs: [[1, 2, 3], [4, 3, 2, 1], [9]],
		solutions: [[1, 2, 4], [4, 3, 2, 2], [1, 0]]
	},
	{
		title: "palindrome substring",
		description: "Given a string, find the longest substring that is a palindrome",
		template: 'function palindromeSubString(str){\n\t\n}',
		solution: '',
		difficulty: 3,
		codeLine: '\nconst func = palindromeSubstring',
		inputs: ["babad", "cddb", "zzzazzza"],
		solutions: ["aba", "dd", "zzzazzz"]
	}

]

const seedDB = async () => {
	await Question.deleteMany({});
	await Question.insertMany(seedQuestions);
}

seedDB().then(() => {
	mongoose.connection.close();
})
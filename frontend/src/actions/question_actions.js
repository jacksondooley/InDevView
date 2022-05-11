import * as QuestionAPIUtil from '../util/question_api_util'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const RECEIVE_QUESTION = "RECEIVE_QUESTION";

export const receiveAllQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
})

export const receiveQuestion = question => ({
    type: RECEIVE_QUESTION,
    question
})

export const fetchQuestions = () => dispatch => {
    QuestionAPIUtil.getAllQuestions()
    .then(questions => dispatch(receiveAllQuestions(questions)))
    .catch(err => console.log(err))
}

export const fetchQuestion = (questionId) => dispatch => {
    QuestionAPIUtil.getQuestion(questionId)
    .then(question => dispatch(receiveQuestion(question)))
    .catch(err => console.log(err))
}
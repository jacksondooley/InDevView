import * as QuestionAPIUtil from '../util/question_api_util'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
})

export const fetchQuestions = () => dispatch => {
    QuestionAPIUtil.getQuestions()
    .then(questions => dispatch(receiveQuestions(questions)))
    .catch(err => console.log(err))
}
import * as QuestionAPIUtil from '../util/question_api_util'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export const receiveAllQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
})

export const fetchQuestions = () => dispatch => {
    QuestionAPIUtil.getAllQuestions()
    .then(questions => dispatch(receiveAllQuestions(questions)))
    .catch(err => console.log(err))
}


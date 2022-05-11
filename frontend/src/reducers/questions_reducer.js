import { RECEIVE_QUESTIONS, RECEIVE_QUESTION } from "../actions/question_actions";

export default function(state = {}, action){
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return action.questions.data
        case RECEIVE_QUESTION:
            return action.question.data
        default:
            return state;
    }
}



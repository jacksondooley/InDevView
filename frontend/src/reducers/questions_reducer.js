import { RECEIVE_QUESTIONS } from "../actions/question_actions";

export default function(state = {}, action){
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return action.questions.data
        default:
            return state;
    }
}
import {SHOW_MODAL, CLOSE_MODAL} from '../actions/modal_actions';

const modalReducer = (oldState = {}, action) => {
	Object.freeze(oldState);

	switch(action.type) {
		case SHOW_MODAL:
			return action.modal;
		case CLOSE_MODAL:
			return null;
		default:
			return oldState;
	}
}

export default modalReducer;
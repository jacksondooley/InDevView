import { RECEIVE_ROOM, RECEIVE_PARTICIPANT, REMOVE_PARTICIPANT } from "../actions/room_actions";

const roomsReducer = (state = {}, action) => {
  Object.freeze(state)
  const dupState = Object.assign({}, state)
  switch(action.type) {
    case RECEIVE_ROOM:
      return action.room
    case RECEIVE_PARTICIPANT:
      dupState.rooms.participants[action.participant.id] = action.participant
    case REMOVE_PARTICIPANT:
      delete dupState.participants.action.participantId
      return dupState
    default:
      return state
  }
}

export default roomsReducer;
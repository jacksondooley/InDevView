import { RECEIVE_ROOM, RECEIVE_PARTICIPANT, REMOVE_PARTICIPANT, REMOVE_ROOM } from "../actions/room_actions";

const roomsReducer = (state = {}, action) => {
  Object.freeze(state)
  const dupState = Object.assign({}, state)
  switch(action.type) {
    case RECEIVE_ROOM:
      const room = action.room
      console.log(room[0])
      return room
    case RECEIVE_PARTICIPANT:
      console.log(Object.values(dupState))
      const tempState = Object.values(dupState)[0]
      tempState.participants.push(action.participant.id)
      return tempState
    case REMOVE_PARTICIPANT:
      delete dupState.participants.action.participantId
      return dupState
    case REMOVE_ROOM:
      return {}
    default:
      return state
  }
}

export default roomsReducer;
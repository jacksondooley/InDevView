import * as RoomAPIUtil from '../util/room_api_util'

export const RECEIVE_ROOM = "RECEIVE_ROOM"
export const RECEIVE_PARTICIPANT = "RECEIVE_PARTICIPANT"
export const REMOVE_PARTICIPANT = "REMOVE_PARTICIPANT"
export const REMOVE_ROOM = "REMOVE_ROOM"

export const receiveRoom = room => ({
  type: RECEIVE_ROOM,
  room
})

export const receiveParticipant = participant => ({
  type: RECEIVE_PARTICIPANT,
  participant
})

export const removeParticipantAction = participantId => ({
  type: REMOVE_PARTICIPANT,
  participantId
})

export const removeRoom = () => ({
  type: REMOVE_ROOM
})

export const createRoom = room => dispatch => (
  RoomAPIUtil.createRoom(room)
    .then((newRoom) => dispatch(receiveRoom(newRoom.data)))
)

export const addParticipant = (roomKey, participant) => dispatch => {
  console.log("----")
  console.log(roomKey)
  console.log(participant)
  console.log("----")
  return (
  RoomAPIUtil.addParticipant(roomKey, participant)
    .then((response) => dispatch(receiveRoom(response.data))))
}

export const removeParticipant = participantId => dispatch => (
  RoomAPIUtil.removeParticipant(participantId)
    .then(() => dispatch(removeParticipantAction(participantId)))
)

export const fetchRoom = roomKey => dispatch => (
  RoomAPIUtil.fetchRoom(roomKey)
    .then((response) => dispatch(receiveRoom(response.data)))
)
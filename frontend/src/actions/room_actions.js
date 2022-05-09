import * as RoomAPIUtil from '../util/room_api_util'

export const RECEIVE_ROOM = "RECEIVE_ROOM"
export const RECEIVE_PARTICIPANT = "RECEIVE_PARTICIPANT"
export const REMOVE_PARTICIPANT = "REMOVE_PARTICIPANT"

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

export const createRoom = room => dispatch => (
  RoomAPIUtil.createRoom(room)
    .then(() => dispatch(receiveRoom(room)))
)

export const addParticipant = participant => dispatch => (
  RoomAPIUtil.addParticipant(participant)
    .then(() => dispatch(receiveParticipant(participant)))
)

export const removeParticipant = participantId => dispatch => (
  RoomAPIUtil.removeParticipant(participantId)
    .then(() => dispatch(removeParticipantAction(participantId)))
)
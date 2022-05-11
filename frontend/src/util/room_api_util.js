import axios from "axios";


export const createRoom = (roomData) => {
  return axios.post('/api/rooms/create', roomData)
}

export const addParticipant = (roomKey, user) => {
  console.log(roomKey)
  return axios.patch(`/api/rooms/${roomKey}/join`, user)
}

export const removeParticipant = (userId) => {
  return axios.patch('/api/rooms/remove', userId)
}

export const fetchRoom = (roomKey) => {
  return axios.get(`/api/rooms/${roomKey}`)
}


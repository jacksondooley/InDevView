import axios from "axios";

export const createRoom = (roomData) => {
  return axios.post('/api/rooms/create', roomData)
}

export const addParticipant = (userData) => {
  return axios.patch('/api/rooms/join', userData)
}

export const removeParticipant = (userId) => {
  return axios.patch('/api/rooms/remove', userId)
}
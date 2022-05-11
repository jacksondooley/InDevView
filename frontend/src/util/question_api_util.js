import axios from 'axios';

export const getAllQuestions = () => {
    return axios.get('/api/questions/all');
}

export const getQuestion = questionId => {
    return axios.get(`/api/questions/${questionId}`)
}


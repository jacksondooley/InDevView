import axios from 'axios';

export const getQuestions = () => {
    return axios.get('/api/questions');
}
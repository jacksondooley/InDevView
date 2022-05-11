import axios from 'axios';

export const getAllQuestions = () => {
    return axios.get('/api/questions/all');
}


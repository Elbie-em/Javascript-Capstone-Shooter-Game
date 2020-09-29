import axios from 'axios';
import * as API from './apiData';
import 'regenerator-runtime/runtime'

const postScore = (userName, userScore) => {
  axios.post(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${API.fetchApiKey()}/scores/`, {
    user: userName,
    score: userScore,
  }).catch((err) => { // eslint-disable-line no-unused-vars
    alert('OOPS something went wrong'); // eslint-disable-line no-alert
  });
};

const getScores = async () => { // eslint-disable-line consistent-return
  try {
    const response = await axios.get(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${API.fetchApiKey()}/scores/`, { mode: 'cors' });
    const scores = await response.data.result;
    return scores;
  } catch (error) {
    alert('OOPS something went wrong'); // eslint-disable-line no-alert
  }
};
export { postScore, getScores };
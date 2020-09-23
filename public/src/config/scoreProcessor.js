import * as API from './apiData'
import axios from 'axios'

const postScore = (userName, userScore) => {
	axios.post(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${API.fetchApiKey()}/scores/`, {
		user: userName,
		score: userScore
	}).catch((err) => {
		console.log(err)
	});
}

const getScores = async () => {
	const response = await axios.get(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${API.fetchApiKey()}/scores/`, {mode: 'cors'});
	const scores = await response.data.result
	return scores;
}
export { postScore, getScores}
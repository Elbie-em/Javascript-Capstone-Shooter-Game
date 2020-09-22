import * as API from './apiData'
import axios from 'axios'

const postScore = (userName, userScore) => {
	axios.post(`https://example.com/profilehttps://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${API.fetchApiKey}scores/`, {
		user: userName,
		score: userScore
	}).catch((err) => {
		console.log(err)
	});
}

export { postScore }
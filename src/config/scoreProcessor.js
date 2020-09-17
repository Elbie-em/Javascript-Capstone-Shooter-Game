import * as API from './apiData'

const postScore = (user, score) => {
	fetch(`https://example.com/profilehttps://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${API.fetchApiKey}scores/`, {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ user, score }),
	})
		.then(response => response.json())
		.catch((error) => {
			console.log('Error:', error);
		});
}

export { postScore }
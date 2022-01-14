/* Base URL */
const DATABASE_URL = "http://localhost:4000"


function getBuyPosts() {
	return fetch(`${DATABASE_URL}/buy-post`)
	.then(res => {
		return res.json();
	}).then(json => {
		return json;
	});
}

function getSellPosts() {
	return fetch(`${DATABASE_URL}/sell-post`)
	.then(res => {
		return res.json();
	}).then(json => {
		return json;
	});
}

function storePost(trade, info) {
	console.log("success");
	return fetch(`${DATABASE_URL}/${trade}-post`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
		body: JSON.stringify(info)
	})
}

export {
	getBuyPosts,
	getSellPosts,
	storePost
}
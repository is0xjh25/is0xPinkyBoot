/* Base URL */
const DATABASE_URL = process.env.DATABASE_LOCAL

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
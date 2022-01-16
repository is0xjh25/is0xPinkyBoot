/* Base URL */
const BASE_URL = "http://localhost:4000";

function getUserInfo(id) {
	return fetch(`${BASE_URL}/user/${id}`)
	.then(res => {
		return res.json();
	}).then(json => {
		return json;
	});
}

function getBuyPosts() {
	return fetch(`${BASE_URL}/buy-post`)
	.then(res => {
		return res.json();
	}).then(json => {
		return json;
	});
}

function getSellPosts() {
	return fetch(`${BASE_URL}/sell-post`)
	.then(res => {
		return res.json();
	}).then(json => {
		return json;
	});
}

function deletePost(post) {
	return fetch(`${BASE_URL}/${post.trade}-post/${post.id}`, {
		method: 'DELETE'
	})
}

function storePost(trade, info) {
	return fetch(`${BASE_URL}/${trade}-post`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
		body: JSON.stringify(info)
	})
}

export {
	getUserInfo,
	getBuyPosts,
	getSellPosts,
	deletePost,
	storePost
}
/* Base URL */
const BASE_URL = "http://localhost:4000";

function getUserInfo(id) {
	return fetch(`${BASE_URL}/user/${id}`)
	.then(res => {
		if (res.status !== 200) alert("ERROR: Fetching 'getUserInfo()'");
		return res.json();
	}).then(json => {
		return json;
	});
}

function getBuyPosts() {
	return fetch(`${BASE_URL}/buy-post`)
	.then(res => {
		if (res.status !== 200) alert("ERROR: Fetching 'getBuyPosts()'");
		return res.json();
	}).then(json => {
		return json;
	})
}

function getSellPosts() {
	return fetch(`${BASE_URL}/sell-post`)
	.then(res => {
		if (res.status !== 200) alert("ERROR: Fetching 'getSellPosts()'");
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

function storePost(post) {
	return fetch(`${BASE_URL}/${post.trade}-post`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
		body: JSON.stringify(post)
	})
}

export {
	getUserInfo,
	getBuyPosts,
	getSellPosts,
	deletePost,
	storePost
}
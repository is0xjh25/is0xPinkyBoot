/* Base URL */
import { capitalize } from "./Utilities";
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

function deletePost(post) {
	return fetch(`${BASE_URL}/${post.trade}-post/${post.id}`, {
		method: 'DELETE'
	})
}

function starPost(userId, post) {
	
	const target = `starred${capitalize(post.trade)}Post`;
	
	return getUserInfo(userId).then(user => {
		return user[target];
	}).then(arr => {
		const newArr = addNew(arr, String(post.id));
		return fetch(`${BASE_URL}/user/${userId}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({[target]: newArr})
		})
	}).then(res => {
		return res;
	})
}

function addNew(arr, e) {
	if (!arr.includes(e)) arr.push(e);
	return arr;
}

export {
	getUserInfo,
	getBuyPosts,
	getSellPosts,
	storePost,
	deletePost,
	starPost
}
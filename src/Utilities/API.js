/* Base URL */
import { capitalize } from "./Utilities";
const BASE_URL = "http://localhost:4000";

/* Main APIs */
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
	}).then(res => {
		return res.json();
	}).then(post => {
		return savePost(post.posterId, post, "owned");
	})
}

function deletePost(post) {
	return fetch(`${BASE_URL}/${post.trade}-post/${post.id}`, {
		method: 'DELETE'
	}).then(_ => {
		return removePost(post.posterId, post, "owned");
	})
}

// for owning and staring posts
function savePost(userId, post, opt) {
	
	const target = `${opt}${capitalize(post.trade)}Post`;
	
	return getUserInfo(userId).then(user => {
		return user[target];
	}).then(arr => {
		const newArr = save(arr, String(post.id));
		return fetch(`${BASE_URL}/user/${userId}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({[target]: newArr})
		})
	})
}

// remove a post form owned or starred posts
function removePost(userId, post, opt) {
	
	const target = `${opt}${capitalize(post.trade)}Post`;
	
	return getUserInfo(userId).then(user => {
		return user[target];
	}).then(arr => {
		const newArr = remove(arr, String(post.id));
		console.log(target);
		console.log(newArr);
		return fetch(`${BASE_URL}/user/${userId}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({[target]: newArr})
		})
	})
}

/* Helper Functions */
function save(arr, e) {
	if (!arr.includes(e)) arr.push(e);
	return arr;
}

function remove(arr, e) {
	const index = arr.indexOf(e);
	if (index > -1) arr.splice(index, 1);
	return arr;
}

export {
	getUserInfo,
	getBuyPosts,
	getSellPosts,
	storePost,
	deletePost,
	savePost,
	removePost
}
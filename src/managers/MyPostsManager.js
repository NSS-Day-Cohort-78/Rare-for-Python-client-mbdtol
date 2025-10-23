export const FetchMyPosts = (token) => {
	return fetch(`http://localhost:8088/posts?user_id=${token}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	}).then((res) => res.json())
}

export const FetchPostById = (postId) => {
	return fetch(`http://localhost:8088/posts/${postId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	}).then((res) => res.json())
}

export const FetchPostCategories = () => {
	return fetch("http://localhost:8088/categories", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	}).then((res) => res.json())
}

export const EditPost = (editedPost) => {
	return fetch(`http://localhost:8088/posts/${editedPost.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editedPost)
	})
}

export const FetchAllPosts = (token) => {
	return fetch(`http://localhost:8088/posts`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	}).then((res) => res.json())
}

export const CreatePost = (newPost) => {
	return fetch(`http://localhost:8088/posts`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newPost)
	}).then((res) => res.json())
}

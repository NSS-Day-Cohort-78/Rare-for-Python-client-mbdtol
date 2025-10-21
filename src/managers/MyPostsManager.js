export const FetchMyPosts = (token) => {
	return fetch(`http://localhost:8088/posts?user_id=${token}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	}).then((res) => res.json())
}

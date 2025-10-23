export const FetchUserById = (userId) => {
	return fetch(`http://localhost:8088/users/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	}).then((res) => res.json())
}
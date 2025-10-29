export const FetchAllTags = () => {
	return fetch(`http://localhost:8088/tags`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	}).then((res) => res.json())
}

export const CreateTag = (newTag) => {
	return fetch(`http://localhost:8088/tags`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newTag)
	}).then((res) => res.json())
}
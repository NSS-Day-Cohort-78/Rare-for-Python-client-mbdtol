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

export const FetchTagById = (tagId) => {
	return fetch(`http://localhost:8088/tags/${tagId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	}).then((res) => res.json())
}

export const DeleteTag = (tagId) => {
	return fetch(`http://localhost:8088/tags/${tagId}`, {
		method: "DELETE"
	})
}

export const EditTag = (editedTag) => {
	return fetch(`http://localhost:8088/tags/${editedTag.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editedTag)
	})
}

export const UpdatePostTags = (changes) => {
	return fetch(`http://localhost:8088/posts/${changes.post_id}/tags`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(changes)
	})
}
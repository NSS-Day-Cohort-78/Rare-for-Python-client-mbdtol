import { useRef, useState } from "react"
import { CreatePost } from "../../managers/MyPostsManager"
import { useNavigate } from "react-router-dom"

export const NewPost = ({ token }) => {
	const title = useRef()
	const content = useRef()
	const imageUrl = useRef()
	const category = useRef()
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState("Select Category")
	const [selectedCategoryId, setSelectedCategoryId] = useState(null)
	const [selectedTags, setSelectedTags] = useState([])
	const navigate = useNavigate()

	const handleCreatePost = (e) => {
		e.preventDefault()

		const newPost = {
			user_id: token,
			title: title.current.value,
			content: content.current.value,
			image_url: imageUrl.current.value,
			category_id: selectedCategoryId,
			tags: selectedTags,
			publication_date: new Date(),
			approved: true
		}

		CreatePost(newPost).then((res) => {
			// Handle post-creation logic here (e.g., navigate to the new post)
			navigate("/myposts")
		})
	}

	const handleCategorySelect = (categoryName, categoryId) => {
		setSelectedCategory(categoryName)
		setSelectedCategoryId(categoryId)
		category.current.value = categoryName
		setDropdownOpen(false)
	}

	// const handleTagChange = (tagName) => {
	// 	if (selectedTags.includes(tagName)) {
	// 		// Remove tag if already selected
	// 		setSelectedTags(selectedTags.filter((tag) => tag !== tagName))
	// 	} else {
	// 		// Add tag if not selected
	// 		setSelectedTags([...selectedTags, tagName])
	// 	}
	// }

	return (
		<section className="columns is-centered">
			<div className="column is-two-thirds">
				<form onSubmit={handleCreatePost}>
					<h1 className="title">Create New Post</h1>
					<div className="field">
						<label className="label">Title</label>
						<div className="control">
							<input className="input" type="text" ref={title} required />
						</div>
					</div>

					<div className="field">
						<label className="label">Header Image URL (optional)</label>
						<div className="control">
							<input className="input" type="text" ref={imageUrl} />
						</div>
					</div>

					<div className="field">
						<label className="label">Content</label>
						<div className="control">
							<textarea className="textarea" type="text" ref={content} required />
						</div>
					</div>

					<div className="field">
						<label className="label">Category</label>
						<div className={`dropdown ${dropdownOpen ? "is-active" : ""}`}>
							<div className="dropdown-trigger">
								<button
									type="button"
									className="button"
									onClick={() => setDropdownOpen(!dropdownOpen)}
									aria-haspopup="true"
									aria-controls="dropdown-menu"
								>
									<span>{selectedCategory}</span>
									<span className="icon is-small">
										<i className="fas fa-angle-down" aria-hidden="true"></i>
									</span>
								</button>
							</div>
							<div className="dropdown-menu" id="dropdown-menu" role="menu">
								<div className="dropdown-content">
									<button
										type="button"
										className="dropdown-item"
										onClick={() => handleCategorySelect("News", 1)}
									>
										News
									</button>
								</div>
							</div>
						</div>
						<input type="hidden" ref={category} required />
					</div>

					{/* <div className="field">
						<label className="label">Tags</label>
						<div className="control">
							<label className="checkbox">
								<input
									type="checkbox"
									checked={selectedTags.includes(1)}
									onChange={() => handleTagChange(1)}
								/>{" "}
								Javascript
							</label>
						</div>
					</div> */}

					<div className="field">
						<div className="control">
							<button type="submit" className="button is-primary">
								Create Post
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	)
}

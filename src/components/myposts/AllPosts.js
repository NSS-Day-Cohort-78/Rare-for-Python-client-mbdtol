import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FetchAllPosts } from "../../managers/MyPostsManager"

export const AllPosts = ({ token }) => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		// Fetch all posts when component mounts
		FetchAllPosts(token).then((data) =>
			setPosts(data.sort((a, b) => a.publication_date - b.publication_date))
		)
	}, [token])

	return (
		<>
			{posts.map((post) =>
				post.approved && new Date(post.publication_date) <= new Date() ? (
					<div key={post.id} className="box">
						<Link to={`/post/${post.id}`}>
							<h2 className="title is-4">{post.title}</h2>
						</Link>
						<p>{post.category}</p>
						<p>{post.author}</p>
					</div>
				) : null
			)}
		</>
	)
}

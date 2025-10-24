import { useState } from "react"
import { FetchPostsByUserProfile } from "../../managers/MyPostsManager"
import { Link, useParams } from "react-router-dom"

export const PostsByUserProfile = () => {
	const params = useParams()
	const [posts, setPosts] = useState([])

	useState(() => {
		FetchPostsByUserProfile(params.userId).then((data) => setPosts(data))
	}, [params])

	return (
		<>
			{posts.map((post) =>
				post.approved && new Date(post.publication_date) <= new Date() ? (
					<div key={post.id} className="box">
						<Link to={`/post/${post.id}`}>
							<h2 className="title is-4">{post.title}</h2>
						</Link>
						<p>{post.category}</p>
						<Link to={`/profile/${post.user_id}`}>
							<p>{post.author}</p>
						</Link>
					</div>
				) : null
			)}
		</>
	)
}

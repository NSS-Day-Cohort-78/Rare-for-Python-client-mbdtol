import { useEffect, useState } from "react"
import { FetchPostsByUserProfile } from "../../managers/MyPostsManager"
import { FetchUserById } from "../../managers/UsersManager"
import { Link, useParams } from "react-router-dom"

export const PostsByUserProfile = () => {
	const params = useParams()
	const [posts, setPosts] = useState([])
	const [user, setUser] = useState({})

	useState(() => {
		FetchPostsByUserProfile(params.userId).then((data) => setPosts(data))
	}, [params])

	useEffect(() => {
		FetchUserById(params.userId).then((userData) => {
			setUser(userData)
		})
	}, [params])

	return (
  <section className="section">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds">
          <h1 className="title">All Posts by {user.first_name} {user.last_name}</h1>
          {posts.map((post) =>
            post.approved && new Date(post.publication_date) <= new Date() ? (
              <div key={post.id} className="box">
                <Link to={`/post/${post.id}`}>
                  <h2 className="title is-4">{post.title}</h2>
                </Link>
                <p className="subtitle is-6">{post.category}</p>
                {/* <Link to={`/profile/${post.user_id}`}>
                  <p className="has-text-grey">By {post.author}</p>
                </Link> */}
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  </section>
);
}

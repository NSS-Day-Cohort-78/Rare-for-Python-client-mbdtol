import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { FetchUserById } from "../managers/UsersManager"

export const AuthorProfile = () => {
	const { userId } = useParams()
	const [author, setAuthor] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		FetchUserById(userId).then((userData) => {
			setAuthor(userData)
		})
	}, [userId])

	return (
  <section className="section">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds">
          <div className="box">
            <div className="media">
              <div className="media-left">
                {author.profile_image_url && (
                  <figure className="image is-128x128">
                    <img 
                      className="is-rounded"
                      src={author.profile_image_url} 
                      alt={author.username} 
                    />
                  </figure>
                )}
              </div>
              <div className="media-content">
                <h1 className="title">
                  {author.first_name} {author.last_name}
                </h1>
                <h2 className="subtitle is-6 has-text-grey">
                  @{author.username}
                </h2>
                <div className="content">
                  <p>{author.bio}</p>
                </div>
              </div>
            </div>
            
            <hr />
            
            <div className="has-text-centered">
              <Link to={`/postsbyuser/${userId}`} className="button is-info">
                View {author.first_name}'s {author.post_count} Post{author.post_count !== 1 ? 's' : ''}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}

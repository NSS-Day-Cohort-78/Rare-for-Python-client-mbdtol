import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FetchPostById } from "../../managers/MyPostsManager";

export const PostDetails = ({ token }) => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    FetchPostById(postId).then((postData) => {
      setPost(postData);
    });
  }, [postId]);

  const ShowButtons = () => {
    if (post.user_id === parseInt(token)) {
      return (
        <div className="level is-mobile">
          <div className="level-left">
            <div className="buttons">
              <button
                className="button is-info"
                type="button"
                onClick={() => navigate(`/edit-post/${post.id}`)}
              >
                Edit
              </button>
              <button
                className="button is-danger"
                type="button"
                onClick={() => navigate(`/delete-post/${post.id}`)}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="level-right">
            <button
              className="button is-info is-light"
              type="button"
              onClick={() => navigate(`/post/${post.id}/tags`)}
            >
              Manage Tags
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="box">
              <h1 className="title">{post.title}</h1>

              {/* Eventual if statement checking for post tags and filling them in */}
              {/* Hard coded placeholder for now */}
              
              {/* <div className="tags">
                <span className="tag is-medium is-info is-light">
                  Adventure
                </span>
                <span className="tag is-medium is-info is-light">Blog</span>
                <span className="tag is-medium is-info is-light">Outdoors</span>
              </div> */}

              {post.tags && post.tags.length > 0 && (
                <div className="tags">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="tag is-medium is-info is-light"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              )}

              {post.image_url && (
                <figure className="image mb-4">
                  <img src={post.image_url} alt={post.title} />
                </figure>
              )}

              <div className="content">
                <Link to={`/profile/${post.user_id}`}>
                  <p className="subtitle is-6 has-text-grey">
                    By {post.author_firstname} {post.author_lastname}
                  </p>
                </Link>
                <p>{post.content}</p>

                <p className="has-text-grey is-size-7">
                  {new Date(post.publication_date).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4">{ShowButtons()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

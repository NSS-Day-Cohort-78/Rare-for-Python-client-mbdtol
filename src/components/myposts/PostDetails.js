import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        <>
          <button
            className="button is-link"
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
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div key={post.id} className="box">
        <h1 className="title is-4">{post.title}</h1>
        <div>
          {post.image_url && <img src={post.image_url} alt={post.title} />}
        </div>
        <div>
          By {post.author_firstname} {post.author_lastname}
        </div>
        <p>{post.content}</p>
        <div>{post.publication_date}</div>
        <div>{ShowButtons()}</div>
      </div>
    </>
  );
};

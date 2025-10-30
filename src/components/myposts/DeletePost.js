import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchPostById, DeletePost } from "../../managers/MyPostsManager";

export const DeletePostConfirm = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    FetchPostById(postId).then((postData) => {
      setPost(postData);
    });
  }, [postId]);

  const HandleDelete = (postId) => {
    DeletePost(postId).then(() => {
      navigate(-2);
    });
  };

  return (
  <section className="section">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box has-text-centered">
            <p className="subtitle is-6 mb-5">
              Are you sure you want to delete "<strong>{post.title}</strong>"?
            </p>
            <p className="has-text-grey mb-5">This action cannot be undone.</p>
            
            <div className="buttons is-centered">
              <button
                className="button is-info is-medium"
                type="button"
                onClick={() => navigate(-1)}
              > Go Back
              </button>
              <button
                className="button is-danger is-medium"
                type="button"
                onClick={() => HandleDelete(postId)}
              > Delete Forever
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

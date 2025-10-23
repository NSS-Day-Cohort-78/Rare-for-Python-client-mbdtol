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
    <>
      <div key={post.id} className="box">
        <h1>Are you sure you want to delete "{post.title}"?</h1>
        <button
          className="button is-link"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          No. Go Back
        </button>
        <button
          className="button is-danger"
          type="button"
          onClick={() => {
            HandleDelete(postId);
          }}
        >
          Yes. DELETE
        </button>
      </div>
    </>
  );
};

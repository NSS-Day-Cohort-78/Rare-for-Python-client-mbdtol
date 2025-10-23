import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FetchPostById } from "../../managers/MyPostsManager";

export const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        FetchPostById(postId).then((postData) => {
            setPost(postData);
        })
    }, [postId])

  return (
    <>
      <div key={post.id} className="box">
        <h1 className="title is-4">{post.title}</h1>
        <div>
           {post.image_url && <img src={post.image_url} alt={post.title}/>}
        </div>
        <div>By {post.author_firstname} {post.author_lastname}</div>
        <p>{post.content}</p>
        <div>{post.publication_date}</div>
        <button
            className="button is-link"
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
      </div>
    </>
  );
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchMyPosts } from "../../managers/MyPostsManager";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's posts when component mounts
    FetchMyPosts(token).then((data) => setPosts(data));
  }, [token]);

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="box">
          <h2 className="title is-4">{post.title}</h2>
          <p>{post.content}</p>
          <button
            className="button is-link"
            type="button"
            onClick={() => navigate(`/edit-post/${post.id}`)}
          >
            Edit
          </button>
        </div>
      ))}
    </>
  );
};

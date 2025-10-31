import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FetchMyPosts } from "../../managers/MyPostsManager";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's posts when component mounts
    FetchMyPosts(token).then((data) => setPosts(data));
  }, [token]);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <h1 className="title">My Posts</h1>
            {posts.map((post) => (
              <div key={post.id} className="box">
                <Link to={`/post/${post.id}`}>
                  <h2 className="title is-4 mb-2">{post.title}</h2>
                </Link>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchAllPosts } from "../../managers/MyPostsManager";
import { FetchSearchTitles } from "../../managers/MyPostsManager";

export const AllPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [searchedFor, setSearchedFor] = useState("");

  useEffect(() => {
    // Fetch all posts when component mounts
    FetchAllPosts(token).then((data) =>
      setPosts(data.sort((a, b) => a.publication_date - b.publication_date))
    );
  }, [token]);

  const handleChange = async (event) => {
    if (event.target.value !== "") {
      const data = await FetchSearchTitles(event.target.value);
      setPosts(data.sort((a, b) => a.publication_date - b.publication_date));
      setSearchedFor(event.target.value);
    } else {
      FetchAllPosts(token).then((data) =>
        setPosts(data.sort((a, b) => a.publication_date - b.publication_date))
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="box">
              <h1 className="title">Search Posts By Title</h1>
              <form onSubmit={handleSubmit}>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input"
                      type="search"
                      id="search-titles"
                      name="q"
                      placeholder="Search for posts..."
                      onChange={handleChange}
                    />
                  </div>
                  <div className="control">
                    <button className="button is-info" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {posts.length > 0 ? (
              posts.map((post) =>
                post.approved &&
                new Date(post.publication_date) <= new Date() ? (
                  <div key={post.id} className="box">
                    <Link to={`/post/${post.id}`}>
                      <h2 className="title is-4 mb-2">{post.title}</h2>
                    </Link>
                    <p className="subtitle is-6">{post.category}</p>
                    <Link to={`/profile/${post.user_id}`}>
                      <p className="has-text-grey">By {post.author}</p>
                    </Link>
                  </div>
                ) : null
              )
            ) : (
              <div className="box has-text-centered">
                <p className="subtitle is-5">
                  No results found for: <strong>{searchedFor}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

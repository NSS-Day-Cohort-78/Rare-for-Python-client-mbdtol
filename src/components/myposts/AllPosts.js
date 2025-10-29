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
    } 
	else {
      FetchAllPosts(token).then((data) =>
        setPosts(data.sort((a, b) => a.publication_date - b.publication_date))
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <section>
      <h1>Search Posts By Title</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-titles">Search:</label>
        <input
          type="search"
          id="search-titles"
          name="q"
          onChange={handleChange}
        />
      </form>

	{posts.length > 0 ? (posts.map((post) =>
        post.approved && new Date(post.publication_date) <= new Date() ? (
          <div key={post.id} className="box">
            <Link to={`/post/${post.id}`}>
              <h2 className="title is-4">{post.title}</h2>
            </Link>
            <p>{post.category}</p>
            <Link to={`/profile/${post.user_id}`}>
              <p>{post.author}</p>
            </Link>
          </div>
        ) : null
      )) : (<p>No results found for: {searchedFor}</p>)} 
    </section>
  );
};

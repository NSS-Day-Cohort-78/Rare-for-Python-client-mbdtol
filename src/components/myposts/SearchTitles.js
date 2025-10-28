import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchSearchTitles } from "../../managers/MyPostsManager";

export const SearchTitles = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedFor, setSearchedFor] = useState("")
  
  const handleChange = (event) => {
    const currentTerms = event.target.value;
    setSearchTerm(currentTerms);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm !== "") {
      const data = await FetchSearchTitles(searchTerm);
      setHasSearched(true)
      setResults(data.sort((a, b) => a.publication_date - b.publication_date));
      setSearchedFor(searchTerm)
    }
    
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
          value={searchTerm}
          onChange={handleChange}
        />
      </form>

      {results.length > 0 ? (
        results.map((post) =>
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
        )
      ) : (
        hasSearched ? (<p>No results found for: {searchedFor}</p>) : <p>No results yet, please search</p>
      )}
    </section>
  );
};

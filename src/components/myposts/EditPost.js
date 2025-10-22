import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FetchPostById,
  EditPost,
  FetchPostCategories,
} from "../../managers/MyPostsManager";

export const EditPostForm = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    FetchPostCategories().then((categoriesArr) => setCategories(categoriesArr));
  }, []);

  useEffect(() => {
    FetchPostById(postId).then((postData) => {
      setPost(postData);
    });
  }, [postId]);

  const categoryOptions = () => {
    return categories
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((category) => {
        return (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        );
      });
  };

  const handleEditPost = (event) => {
    event.preventDefault();

    const editedPost = {
      id: post.id,
      user_id: post.user_id,
      category_id: post.category_id,
      title: post.title,
      publication_date: post.publication_date,
      image_url: post.image_url,
      content: post.content,
      approved: post.approved,
    };

    EditPost(editedPost).then(() => {
      navigate(`/post-details`);
    });
  };

  return (
    <>
      <form className="box">
        <fieldset>
          <div>
            <div>
              <label>Title : </label>
            </div>
            <input
              type="text"
              required
              value={post.title || ""}
              placeholder={post.title}
              onChange={(event) => {
                const copy = { ...post };
                copy.title = event.target.value;
                setPost(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Content : </label>
            </div>
            <textarea
              required
              value={post.content || ""}
              placeholder={post.content}
              onChange={(event) => {
                const copy = { ...post };
                copy.content = event.target.value;
                setPost(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Category : </label>
            </div>
            <select
              id="category-select"
              required
              name="category"
              value={post.category_id || ""}
              placeholder={post.category_id}
              onChange={(event) => {
                const copy = { ...post };
                copy.category_id = event.target.value;
                setPost(copy);
              }}
            >
              <option value="">Category</option>
              {categoryOptions()}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <div>
              <label>Header Image URL (optional) : </label>
            </div>
            <input
              type="text"
              value={post.image_url || ""}
              placeholder={post.image_url || ""}
              onChange={(event) => {
                const copy = { ...post };
                copy.image_url = event.target.value;
                setPost(copy);
              }}
            />
          </div>
        </fieldset>
        <div>
          <button
            className="button is-danger"
            type="button"
            onClick={() => navigate("/myposts")}
          >
            Cancel
          </button>

          <button
            className="button is-link"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              if (post.title && post.content && post.category_id) {
                handleEditPost(event);
              } else {
                window.alert("Title, Content, and Category required.");
              }
            }}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FetchAllTags, UpdatePostTags } from "../../managers/TagManager";
import { FetchPostById } from "../../managers/MyPostsManager";

export const PostTags = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [tags, setTags] = useState([]);
  const [post, setPost] = useState({});
  const [pendingTagChanges, setPendingTagChanges] = useState({
    toAdd: [],
    toRemove: [],
  });

  useEffect(() => {
    FetchAllTags().then((tagData) => {
      setTags(tagData);
    });
  }, []);

  useEffect(() => {
    FetchPostById(postId).then((postData) => {
      setPost(postData);
    });
  }, [postId]);

  // Filter out tags that are already on the post
  const getAvailableTags = () => {
    if (!post.tags) return tags;

    const postTagIds = post.tags.map((tag) => tag.id);
    return tags.filter((tag) => !postTagIds.includes(tag.id));
  };

  // Handler to add a tag
  const handleAddTag = (tagId) => {
    setPendingTagChanges((prev) => ({
      ...prev,
      toAdd: [...prev.toAdd, tagId],
    }));

    // Optimistically update UI
    const tagToAdd = tags.find((t) => t.id === tagId);
    setPost((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), tagToAdd],
    }));
  };

  // Handler to remove a tag
  const handleRemoveTag = (tagId) => {
    setPendingTagChanges((prev) => ({
      ...prev,
      toRemove: [...prev.toRemove, tagId],
    }));

    // Optimistically update UI
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t.id !== tagId),
    }));
  };

  // Handler to save changes
  const handleSaveChanges = () => {
    const changes = {
      post_id: postId,
      tags_to_add: pendingTagChanges.toAdd,
      tags_to_remove: pendingTagChanges.toRemove,
    };

    UpdatePostTags(changes).then(() => {
      navigate(`/post/${postId}`);
    });
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-two-thirds">
              <div className="box">
                <h1 className="title">Manage Tags</h1>

                {/* Current Post */}
                <div key={post.id} className="box">
                  <Link to={`/post/${post.id}`}>
                    <h2 className="title is-4 mb-4">{post.title}</h2>
                  </Link>

                  {/* Current tags on post with remove buttons */}
                  {post.tags && post.tags.length > 0 ? (
                    <div className="tags">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="tag is-medium is-info is-light"
                        >
                          {tag.label}
                          <button
                            className="delete is-small ml-2"
                            onClick={() => handleRemoveTag(tag.id)}
                          />
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="has-text-grey">No tags yet</p>
                  )}
                </div>

                {/* Available tags with add buttons */}
                <div className="box">
                  {getAvailableTags().length > 0 ? (
                    <div className="tags">
                      {getAvailableTags().map((tag) => (
                        <span key={tag.id} className="tag is-medium is-light">
                          {tag.label}
                          <button
                            className="button is-small ml-2"
                            onClick={() => handleAddTag(tag.id)}
                            style={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                            }}
                          >
                            ➕
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="has-text-grey">
                      All tags are already added to this post
                    </p>
                  )}
                </div>

                {/* Save button */}
                <div className="buttons">
                  <button
                    className="button is-light"
                    onClick={() => navigate(`/post/${postId}`)}
                  >
                    Cancel
                  </button>
                  <button
                    className="button is-info"
                    onClick={handleSaveChanges}
                    disabled={
                      pendingTagChanges.toAdd.length === 0 &&
                      pendingTagChanges.toRemove.length === 0
                    }
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// To-Do:
// Expand post fetch to get PostTags (done)
// Display the current tags on post (done)
// Display all tags not on post (done)
// Add plus/minus functionality to add/delete tags to/from post (done)
// Save button to save changes in database 

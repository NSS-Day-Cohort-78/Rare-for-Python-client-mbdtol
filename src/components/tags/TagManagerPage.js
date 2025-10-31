import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FetchAllTags } from "../../managers/TagManager";

export const TagManagerPage = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    FetchAllTags().then((tagData) => {
      setTags(tagData);
    });
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box">
              <h1 className="title">Tags</h1>
              <div>
                {tags
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((tag) => (
                  <div key={tag.id} className="box mb-2">
                    <div className="level is-mobile">
                      <div className="level-left">
                        <div className="level-item">
                          <span className="tag is-medium is-info is-light">
                            {tag.label}
                          </span>
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          <button
                            className="button is-small is-info is-light"
                            onClick={() => navigate(`/edit-tag/${tag.id}`)}
                          >
                            ✏️
                          </button>
                        </div>
                        <div className="level-item">
                          <button
                            className="button is-small is-danger is-light"
                            onClick={() => navigate(`/delete-tag/${tag.id}`)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/create-tag" className="button is-info">
                  Create Tag
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

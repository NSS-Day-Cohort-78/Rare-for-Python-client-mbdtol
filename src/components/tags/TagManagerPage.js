import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FetchAllTags } from "../../managers/TagManager";

export const TagManagerPage = () => {
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
                        <div className="tags">
                            {tags.map((tag) => (
                                <span key={tag.id} className="tag is-medium is-info is-light">
                                    {tag.label}
                                </span>
                            ))}
                        </div>
                        <div className="mt-5">
                            <Link to="/create-tag" className="button is-info is-medium">
                                Create Tag
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
};

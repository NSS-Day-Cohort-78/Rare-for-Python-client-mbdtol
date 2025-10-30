import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditTag, FetchTagById } from "../../managers/TagManager";

export const EditTagForm = () => {
  const navigate = useNavigate();
  const { tagId } = useParams();
  const [tag, setTag] = useState({});

  useEffect(() => {
    FetchTagById(tagId).then((tagData) => {
      setTag(tagData);
    });
  }, [tagId]);

  const handleEditTag = (event) => {
    event.preventDefault();

    const editedTag = {
      id: tag.id,
      label: tag.label,
    };

    EditTag(editedTag).then(() => {
      navigate("/tag-manager");
    });
  };

  return (
    <section className="columns is-centered">
      <div className="column is-two-thirds">
        <h1 className="title">Edit Tag</h1>
        <form onSubmit={handleEditTag}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                required
                placeholder={tag.label}
                value={tag.label || ""}
                onChange={(event) => {
                  const copy = { ...tag };
                  copy.label = event.target.value;
                  setTag(copy);
                }}
              />
            </div>
          </div>
          <div className="field">
            <div className="buttons">
              <button className="button is-danger" type="button" onClick={() => navigate(-1)}>
                Back
              </button>
              <button className="button is-info" type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchTagById, DeleteTag } from "../../managers/TagManager";

export const DeleteTagConfirm = () => {
  const navigate = useNavigate();
  const { tagId } = useParams();
  const [tag, setTag] = useState({});

  useEffect(() => {
    FetchTagById(tagId).then((tagData) => {
      setTag(tagData);
    });
  }, [tagId]);

  const HandleDelete = (tagId) => {
    DeleteTag(tagId).then(() => {
      navigate("/tag-manager");
    });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box has-text-centered">
              <p className="subtitle is-6 mb-5">
                Are you sure you want to delete tag "
                <strong>{tag.label}</strong>"?
              </p>
              <p className="has-text-grey mb-5">
                This action cannot be undone.
              </p>

              <div className="buttons is-centered">
                <button
                  className="button is-info is-medium"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  {" "}
                  Go Back
                </button>
                <button
                  className="button is-danger is-medium"
                  type="button"
                  onClick={() => HandleDelete(tagId)}
                >
                  {" "}
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTag } from "../../managers/TagManager";

export const CreateTagForm = () => {
  const navigate = useNavigate();
  const [newTag, setNewTag] = useState({
    label: "",
  });

  const handleCreateTag = (event) => {
    event.preventDefault();

    CreateTag(newTag).then(() => {
      navigate("/tag-manager");
    });
  };

    return (
        <section className="columns is-centered">
            <div className="column is-two-thirds">
                <h1 className="title">Create Tag</h1>
                <form onSubmit={handleCreateTag}>
                    <div className="field">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                required
                                placeholder="Enter New Tag"
                                value={newTag.label}
                                onChange={(event) => {
                                    const copy = { ...newTag };
                                    copy.label = event.target.value;
                                    setNewTag(copy);
                                }}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="buttons">
                            <button 
                                className="button is-danger"
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>
                            <button className="button is-info" type="submit">
                                Create
                            </button>
                            
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

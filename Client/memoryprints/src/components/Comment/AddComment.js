import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { addComment } from "../../Managers/CommentManager";

export const AddComment = ({ journalId }) => {
  const [comment, setComment] = useState({
    content: "",
    journalId: "",
    userId: 0, // fetch it from local storage system?
  });

  // const navigate = useNavigate();
  // const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const localAppUser = localStorage.getItem("user");
    const AppUserObject = JSON.parse(localAppUser);
    const userId = AppUserObject.id;

    const commentToSendToAPI = {
      content: comment.content,
      //   journalId: +journalId, // + sign converts it from string to int in object
      userId: +userId,
    };

    addComment(journalId, commentToSendToAPI); // Use the addComment function to add the comment
    //   .then(() => navigate(`/journals/${journalId}`)); // Redirect after adding the comment
    return (
      <form
        className="comment-form"
        onSubmit={(clickEvent) => handleSubmit(clickEvent)}
      >
        <h2 className="comment-form-title">Create a New Comment</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              id="content"
              value={comment.content}
              onChange={(event) =>
                setComment({ ...comment, content: event.target.value })
              }
            />
          </div>
        </fieldset>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };
};

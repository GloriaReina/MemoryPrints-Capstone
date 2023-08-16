import React, { useState } from "react";
import { addComment } from "../../Managers/CommentManager";

export const AddComment = ({ journalId, setShowAddCommentForm}) => {
  const [comment, setComment] = useState({
    content: "",
    journal:"",
    userId: 0 // fetch it from local storage system?
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    const localAppUser = localStorage.getItem("user");
    const AppUserObject = JSON.parse(localAppUser);
    const userId = AppUserObject.id;

    const commentToSendToAPI = {
      Content: comment.content,
      JournalId:journalId,
      UserId: +userId
    };

    addComment(commentToSendToAPI).then(() => {
      // Comment added successfully, close the form
      setShowAddCommentForm(false);
    });
  };

  const handleCancel = () => {
    // Close the form without adding a comment
    setShowAddCommentForm(false);
  };

  return (
    <form
      className="comment-form"
      onSubmit={(clickEvent) => handleSubmit(clickEvent)}
    >
      <h3 className="comment-form-title">Create a New Comment</h3>
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
      <button type="submit" className="journal-button">
        Submit
      </button>
      <button
        type="button"
        className="journal-button"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  );
};

import React, { useState, useEffect } from "react";
import { GetCommentsByJournal } from "../../Managers/CommentManager";
import { DeleteCommentsById } from "../../Managers/CommentManager";
import {Comment} from "./Comment";
import "./CommentList.css"
//receive journalId from Journal Details
const CommentList = ({journalId}) => {
  const [comments, setComments] = useState([]);


   const fetchCommentsByJournal = () => {
    GetCommentsByJournal(journalId)
      .then((allComments) => setComments(allComments))
      .catch((error) => console.error("Error fetching comments:", error));
  };


  useEffect(() => {
    fetchCommentsByJournal();
  }, [journalId]);


  const handleDeleteComment = (commentId) => {
    DeleteCommentsById(commentId)
      .then(() => {
        // After deletion, refresh the comments list
        fetchCommentsByJournal();
      })
  };


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {comments.map((comment) => (
            <>
            <Comment 
            key={comment.id} className="comment-item" // Add the 'key' prop with a unique value (e.g., comment.id)
            comment={comment}
            handleDeleteCommentFnc={() => handleDeleteComment(comment.id)} // If had used syntax:  onDelete={handleDeleteComment(comment.id)} would be  function will be called immediately when the Comment component renders, and the return value (which is expected to be a function) will be passed as the onDelete prop vs  function is invoked only when the onDelete event occurs (i.e., when the "Delete" button is clicked).
            fetchCommentsByJournal = {() =>fetchCommentsByJournal ()}
            />
            </>

          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
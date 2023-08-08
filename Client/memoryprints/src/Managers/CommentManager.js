import React from "react";


const baseUrl = "/api/Comment";


export const  GetCommentsByJournal = (journalId) => {
    return fetch(`${baseUrl}/GetCommentsByJournalId?journalId=${journalId}`) 
      .then((res) => res.json())
  };


  export const addComment = (singleJournal) => { 
    return fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleJournal),
    });
  }; 


  export const editComment = (commentId, updatedFields) => {
    return fetch(`${baseUrl}/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
  };
  

  export const  DeleteCommentsById = (id) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },}) 
  };
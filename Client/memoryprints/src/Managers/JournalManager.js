const baseUrl = "/api/Journal";


export const GetJournalsByUser= (userId)=> {
    return fetch(`${baseUrl}/user/${userId}`) 
      .then((res) => res.json())
  };


  export const getJournalById =(id) => {
    return fetch (`${baseUrl}/${id}`).then((res)=> res.json())
   };

  export const GetAllJournals= ()=> {
    return fetch(`${baseUrl}`) 
      .then((res) => res.json())
  };

  export const GetAllUnapprovedJournals= ()=> {
    return fetch(`${baseUrl}/unapproved`) 
      .then((res) => res.json())
  };

  export const ApproveJournal = (journalId) => {
    return fetch(`/api/Journal/${journalId}/approve`, {
      method: "PUT",
    })
  };

  export const addJournalEntry = (singleJournal) => { 
    return fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleJournal),
    });
  };

  export const editJournalEntry = (updatedFields) => {
    return fetch(`${baseUrl}/${updatedFields.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
  };
  
///api/Journal/14
  export const  DeleteJournalById = (id) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },}) 
  };
const baseUrl = "/api/Journal";


export const GetJournalsByUser= (journalId)=> {
    return fetch(`${baseUrl}/user?journalId=${journalId}`) 
      .then((res) => res.json())
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

  export const editJournalEntry = (journalId, updatedFields) => {
    return fetch(`${baseUrl}/${journalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
  };
  

  export const  DeleteJournalById = (id) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },}) 
  };
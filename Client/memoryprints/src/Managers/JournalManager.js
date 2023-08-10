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
    }).then(r=>r.json())
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


    // export const SearchPosts = (q, sortDescending) => {
  //   return fetch(`${baseUrl}/search?q=${encodeURIComponent(q)}&sortDesc=${sortDescending || false}`)
  //           .then((res) => res.json())         
  // }
 
  export const SearchJournalByDate = (searchDate) => {
    return fetch(`${baseUrl}/searchbydate?searchDate=${encodeURIComponent(searchDate)}`)
            .then((res) => res.json())         
  }

  export const SearchJournalByTerms = (searchTerm) => {
    return fetch(`${baseUrl}/searchbyterm?searchTerm=${encodeURIComponent(searchTerm)}`)
            .then((res) => res.json())         
  }

  /*/searchbycategory?categoryName=Family%20Adventure*/
  export const SearchJournalByCategory = (category) => {
    return fetch(`${baseUrl}/searchbycategory?categoryName=${encodeURIComponent(category)}`)
            .then((res) => res.json())         
  }

  export const SearchJournalByRole = (userRole) => {
    return fetch(`${baseUrl}/searchbyuserrole?roleName=${encodeURIComponent(userRole)}`)
            .then((res) => res.json())         
  }

 /*/searchbyuser?searchValue=ser&searchType=firstname*/
 
 export const SearchJournalByUser = (value, type) => {
  return fetch(`${baseUrl}/searchbyuser?searchValue=${encodeURIComponent(value)}&searchType=${type}`)
          .then((res) => res.json())         
}
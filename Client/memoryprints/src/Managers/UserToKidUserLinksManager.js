const baseUrl = "/api/UserToKidUserProfilesLinks";

/*Retrieves a list of user links*/
export const GetUserToKidUserProfileLinks= ()=> {
    return fetch(`${baseUrl}`) 
      .then((res) => res.json())
  };

  export const addUserProfileLinks = (singleObject) => { 
    return fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleObject),
    });
  };
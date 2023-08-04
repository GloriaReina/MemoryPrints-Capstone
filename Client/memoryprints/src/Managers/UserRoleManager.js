const baseUrl = "/api/UserRole";

/*Retrieves a list of user roles*/
export const GetUserRoles= ()=> {
    return fetch(`${baseUrl}`) 
      .then((res) => res.json())
  };
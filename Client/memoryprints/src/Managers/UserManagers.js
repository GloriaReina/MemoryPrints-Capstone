const baseUrl = "/api/User";


export const GetUserById =(id) => {
  return fetch (`${baseUrl}/users/${id}`).then((res)=> res.json())
 };

 export const EditProfile = (updatedFields) => {
  return fetch(`${baseUrl}/user/${updatedFields.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });
};



export const login = (userObject) => {
  return fetch(
    `${baseUrl}/authenticate?email=${userObject.email}&password=${userObject.password}`
  )
    .then((r) => r.json())
    .then((user) => {
      if (user.id) {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } else {
        return undefined;
      }
    });
};



export const logout = () => {
    localStorage.clear()
};




export const register = (userObject) => {
    return  fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
    .then((response) => response.json())
      // .then((savedUser) => {
      //   localStorage.setItem("user", JSON.stringify(savedUser))
      // });
  };



/*Retrieves a list of user with user role of 3(kids)*/
export const GetListOfKidUsers= ()=> {
    return fetch(`${baseUrl}/users/kids`) 
      .then((res) => res.json())
  };

  /*Retrieves a list of all users */
export const GetAllUsers= ()=> {
  return fetch(`${baseUrl}`) 
    .then((res) => res.json())
};
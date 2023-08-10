import React, { useState, useEffect } from "react";
import { GetUserById } from "../Managers/UserManagers"

export const MyProfile = () => {
  const [userProfile, setUserProfile] = useState([]);

  const localAppUser = localStorage.getItem("user");
  const AppUserObject = JSON.parse(localAppUser);
  const userId = AppUserObject.id;

  useEffect(() => {
    GetUserById(userId)
      .then((userProfile) => setUserProfile(userProfile))
  }, [userId]); 

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        <strong>Name:</strong> {userProfile.FirstName}
      </div>
      <div>
        <strong>Email:</strong> {userProfile.LastName}
      </div>
     
    </div>
  );
}


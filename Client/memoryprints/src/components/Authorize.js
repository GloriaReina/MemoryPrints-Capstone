import React from "react"
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './Login'; 
import Register from './Register'


export default function Authorize({setIsLoggedIn}) {
/* render the components and pass the setIsLoggedIn. Allows Login/Register component to update the logged-in status of the user after successful registration or login.*/
    return(
         <Routes>
         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
         <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
         /* When the URL doesn't match any specific paths, it will render the Navigate component and redirect the user to the /login page*/
         <Route path="*" element={<Navigate to="/login" />} />
         </Routes>
      );
    
   }
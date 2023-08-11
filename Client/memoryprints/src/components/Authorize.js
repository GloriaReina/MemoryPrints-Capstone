import React from "react"
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './Login'; 
import Register from './Register'


export default function Authorize({setIsLoggedIn}) {
/* render the components and pass the setIsLoggedIn. Allows Login/Register component to update the logged-in status of the user after successful registration or login.*/
    return(
       <Routes>
         <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
         <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
  
         <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      );
    
   }
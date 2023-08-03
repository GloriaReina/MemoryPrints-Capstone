import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Homepage";
import AllJournalEntries from "./AllJournalEntries";
import MyProfile from "./My Profile";

export default function ApplicationViews() {

 return(
      <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/allentries" element= {<AllJournalEntries />} />
      <Route path="/myprofile" element= {<MyProfile />} />

      </Routes>

   );
 
}

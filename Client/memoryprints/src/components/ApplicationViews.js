import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Homepage";
import AllJournalEntries from "./AllJournalEntries";
import MyProfile from "./My Profile";
import { JournalDetails } from "./JournalDetails";


export default function ApplicationViews() {

 return(
      <Routes>
      <Route path="/homepage" element={<HomePage />} /> 
      <Route path="/journals/:id" element= {<JournalDetails/>} />
      {/* <Route path="/allentries" element= {<AllJournalEntries />} />
      <Route path="/myprofile" element= {<MyProfile />} /> */}

      </Routes>

   );
 
}

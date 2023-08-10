import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Homepage";
import MyProfile from "./My Profile";
import { JournalDetails } from "./JournalDetails";
import { UnapprovedJournals } from "./Journal/UnapprovedJournals";
import { SharedJournals } from "./Journal/SharedJournals";
import { AllJournalEntries } from "./AllJournalEntries";
export default function ApplicationViews() {

 return(
      <Routes>
      <Route path="/homepage" element={<HomePage />} /> 
      <Route path="/journals/:id" element= {<JournalDetails/>} />
      <Route path="/unapprovedjournals" element= {<UnapprovedJournals/>} />
      <Route path="/sharedjournals" element= {<SharedJournals />} />
      <Route path="/alljournals" element= {<AllJournalEntries />} />
      {/* <Route path="/myprofile" element= {<MyProfile />} />  */}

      </Routes>

   );
 
}

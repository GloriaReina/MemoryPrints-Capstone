const baseUrl = "api/UserToKidUserProfilesLinks";


export const SaveSharedEntry = (sharedJournalObject) => {
    return  fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sharedJournalObject),
    });
  };
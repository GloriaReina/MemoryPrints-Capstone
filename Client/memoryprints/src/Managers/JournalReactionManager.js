const baseUrl = "/api/JournalReaction";


export const getJournalReactions= (userId)=> {
    return fetch(`${baseUrl}/journal/${userId}`) 
      .then((res) => res.json())
  };

export const addJournalReaction=(selectedEmoji, emojiCounts) => {
      return fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emojiId: selectedEmoji.id,
          count: emojiCounts[selectedEmoji.id],
        }),
      });
      
  };
 
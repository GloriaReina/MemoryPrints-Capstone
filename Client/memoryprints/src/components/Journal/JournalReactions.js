// import React, { useState, useEffect } from 'react';
// import { Picker } from 'emoji-mart';
// // import "emoji-mart/css/emoji-mart.css";
// // import 'emoji-mart/dist/css/emoji-mart.css';
// import { getJournalReactions, addJournalReaction } from '../../Managers/JournalReactionManager';

// const JournalReactions = ({ userId }) => {
//     const [reactions, setReactions] = useState([]);
//     const [emojiCounts, setEmojiCounts] = useState({});
  
//     useEffect(() => {
//       // Fetch reactions data from Web API
//       getJournalReactions(userId)
//         .then(response => {
//           setReactions(response);
//           // Count the occurrences of each emoji
//           const counts = {};
//           response.forEach(reaction => {
//             if (!counts[reaction.emojiId]) {
//               counts[reaction.emojiId] = 1;
//             } else {
//               counts[reaction.emojiId]++;
//             }
//           });
//           setEmojiCounts(counts);
//         })
//         .catch(error => {
//           console.error('Error fetching reactions:', error);
//         });
//     }, [userId]);
  
//     const handleEmojiSelect = (selectedEmoji) => {
//       // Update UI with the selected emoji
//       const updatedCounts = { ...emojiCounts };
//       if (!updatedCounts[selectedEmoji.id]) {
//         updatedCounts[selectedEmoji.id] = 1;
//       } else {
//         updatedCounts[selectedEmoji.id]++;
//       }
//       setEmojiCounts(updatedCounts);
  
//       // Send a request to add the reaction to the API
//       addJournalReaction(selectedEmoji, updatedCounts)
//         .then(() => {
//           console.log('Reaction added successfully');
//         })
//         .catch(error => {
//           console.error('Error adding reaction:', error);
//         });
//     };
  
//     return (
//       <div>
//         <h2>Emoji Reactions</h2>
//         <Picker set="apple" emojiSize={24} title="Pick an emoji" onSelect={handleEmojiSelect} />
//         <div>
//           {reactions.map(reaction => (
//             <div key={reaction.emojiId}>
//               {reaction.emojiId} - {emojiCounts[reaction.emojiId] || 0}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

// export default JournalReactions;




// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import { Picker } from "emoji-mart";
// import { addJournalReaction,getJournalReactions } from "../../Managers/JournalReactionManager";


// const JournalReactions = ({ journalId }) => {
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [selectedEmoji, setSelectedEmoji] = useState(null);
//   const [reactions, setReactions] = useState([]);

//   useEffect(() => {
//     // Fetch reactions for the journal and update the state
//     getJournalReactions(journalId) 
//       .then((response) => {
//         setReactions(response.data); // Update the state with the fetched reactions
//       })
//   }, [journalId]);

//   const handleEmojiClick = (emoji) => {
//     setSelectedEmoji(emoji);
//     setShowEmojiPicker(false);
//     // Add the journal reaction 
//     addJournalReaction(journalId, emoji.id) 
//       .then((response) => {
//         // Update the state with the newly added reaction
//         setReactions((prevReactions) => [
//           ...prevReactions,
//           {
//             EmojiCode: emoji.id,
//             EmojiName: emoji.name,
//           },
//         ]);
//       })
//   };

//   // Function to calculate the count for a specific emoji
//   const getEmojiCount = (emojiCode) => {
//     return reactions.filter((reaction) => reaction.EmojiCode === emojiCode).length;
//   };

//   return (
//     <div>
//       <Button onClick={() => setShowEmojiPicker(true)}>Add Reaction</Button>
//       {showEmojiPicker && (
//         <Picker onSelect={handleEmojiClick} title="Pick your emoji" emoji="point_up" />
//       )}
//       {selectedEmoji && <div>Selected emoji: {selectedEmoji.native}</div>}
//       <div>
//         {/* Display the counts for each emoji */}
//         {reactions.map((reaction) => (
//           <div key={reaction.EmojiCode}>
//             {reaction.EmojiName}: {getEmojiCount(reaction.EmojiCode)}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JournalReactions;

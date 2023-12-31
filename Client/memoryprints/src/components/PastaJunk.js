return (
  <div className="modal-overlay">
  <div className="modal-container">
  <Form className="edit-journal-form">
    {canEdit ? (
    <>
    <h2 className="edit-journal-form-title">Edit Journal</h2>
    <Form.Group className="journal-form-group">
      <Form.Label className="journal-form-label">Title:</Form.Label>
      <Form.Control
        type="text"
        required
        value={editedJournal.title}
        onChange={(event) =>
          setEditedJournal({ ...editedJournal, title: event.target.value })
        }
      />
    </Form.Group>
    <Form.Group className="journal-form-group">
      <Form.Label className="journal-form-label">Content:</Form.Label>
      <Form.Control
        as="textarea"
        rows={8}
        required
        value={editedJournal.content}
        onChange={(event) =>
          setEditedJournal({ ...editedJournal, content: event.target.value })
        }
      />
    </Form.Group>
    <Form.Group className="journal-form-group">
      <Form.Label className="journal-form-label">Gratitude:</Form.Label>
      <Form.Control
        type="text"
        required
        value={editedJournal.gratitude}
        onChange={(event) =>
          setEditedJournal({
            ...editedJournal,
            gratitude: event.target.value,
          })
        }
      />
    </Form.Group>
    <Form.Group className="journal-form-group">
      <Form.Label className="journal-form-label">Intention:</Form.Label>
      <Form.Control
        type="text"
        required
        value={editedJournal.intention}
        onChange={(event) =>
          setEditedJournal({
            ...editedJournal,
            intention: event.target.value,
          })
        }
      />
    </Form.Group>
    <Form.Group className="journal-form-group">
      <Form.Label className="journal-form-label">Category:</Form.Label>
      <Form.Control
        as="select"
        required
        value={editedJournal.categoryId}
        onChange={(event) =>
          setEditedJournal({
            ...editedJournal,
            categoryId: parseInt(event.target.value),
          })
        }
      >
        <option value="">-- Select Category --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id || ""}>
            {category.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
    <Button
      variant="success"
      className="save-journal-button"
      onClick={handleSaveClick}
    >
      Save 
    </Button>
    <Button
      variant="success"
      className="cancel-edit-button"
      onClick={handleCancelEditButtonClick}
    >
      Cancel
    </Button> 

    </>
      ) : (
        <Modal className="deniedModal" show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header >
          <Modal.Title>Permission Denied</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You don't have permission to edit this journal.
        </Modal.Body>
        <Modal.Footer>
          <Button className= "deniedCloseBtn"variant="secondary" onClick={() => setShowAlert(false)}>
            X
          </Button>
        </Modal.Footer>
      </Modal>
    )}
  </Form>
);







// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button, Col, Container, Row, Table } from "reactstrap";
// import { Alert } from "react-bootstrap";
// import { GetAllJournals, SearchJournals } from "../../Managers/JournalManager";
// import { Journal } from "../Journal";

// export const JournalSearch = () => {
//   const [journals, setJournals] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showAlert, setShowAlert] = useState(false);

//   const getAllJournals = async () => {
   
//       const allJournals = await GetAllJournals();
//       setJournals(allJournals);
    
//   };

//   useEffect(() => {
//     getAllJournals();
//   }, []);

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//     setShowAlert(false);
//   };

//   const handleSearchButtonClick = async (event) => {
//     event.preventDefault();

//     if (searchQuery.trim() === "") {
//       setShowAlert(true);
//     } else {
//       try {
//         const response = await SearchJournals(searchQuery);
//         setSearchResults(response);
//         setShowAlert(false);
//       } catch (error) {
//         console.error("Error searching journals:", error);
//       }
//     }
//   };

//   const handleCancelSearch = () => {
//     setSearchQuery("");
//     setSearchResults([]);
//     setShowAlert(false);
//   };

//   const emptySearchAlert = () => {
//     return (
//       <Alert variant="danger" key={"danger"}>
//         <div>
//           Please enter a search value.{" "}
//           <Link onClick={() => setShowAlert(false)}>clear</Link>
//         </div>
//       </Alert>
//     );
//   };

//   return (
//     <Container fluid className="journal-list">
//       <Row>
//         <Col>
//           <div>
//             <form className="journal-search-form">
//               <input
//                 type="text"
//                 id="searchQuery"
//                 value={searchQuery}
//                 onChange={handleSearchInputChange}
//               />
//               <Button onClick={handleSearchButtonClick} >
//                 Search
//               </Button>
//               {/* Show cancel button when search query is not empty */}
//               {searchQuery && (
//                 <Button onClick={handleCancelSearch}>Cancel
//                 </Button>
//               )}

//               {showAlert && emptySearchAlert()}
//             </form>
//           </div>

//           {searchResults.length > 0 && (
//             <div>
//               <div>
//                 <Link onClick={handleCancelSearch}>Cancel</Link>
//               </div>
//               <h3>Search Results:</h3>
//               {searchResults.map((journal) => (
//                 <Journal key={journal.id} journalProp={journal} />
//               ))}
//             </div>
//           )}

//           {/* Display all journals when searchResults is empty */}
//           {searchResults.length === 0 && (
//             <div>
//               <h3>All Journals:</h3>
//               {journals.map((journal) => (
//                 <Journal key={journal.id} journalProp={journal} />
//               ))}
//             </div>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import JournalCard from './JournalCard';

// export const JournalSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchDate, setSearchDate] = useState('');
//   const [searchCategory, setSearchCategory] = useState('');
//   const [searchUserRole, setSearchUserRole] = useState('');
//   const [searchType, setSearchType] = useState('Date'); // Default to Date
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     handleSearchButtonClick();
//   }, []);

//   const handleSearchButtonClick = () => {
//     let baseUrl = '/api/journal/';

//     switch (searchType) {
//       case 'Date':
//         baseUrl += `searchbydate?searchDate=${encodeURIComponent(searchDate)}`;
//         break;
//       case 'Term':
//         baseUrl += `searchbyterm?searchTerm=${encodeURIComponent(searchTerm)}`;
//         break;
//       case 'Category':
//         baseUrl += `searchbycategory?categoryName=${encodeURIComponent(searchCategory)}`;
//         break;
//       case 'UserRole':
//         baseUrl += `searchbyuserrole?roleName=${encodeURIComponent(searchUserRole)}`;
//         break;
//       default:
//         break;
//     }

//     fetch(baseUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         setSearchResults(data);
//       });
//   };

//   console.log('searchResults:', searchResults);

//   return (
//     <div>
//       <h1>Journal Search</h1>
//       <div>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by term"
//         />
//         <input
//           type="date"
//           value={searchDate}
//           onChange={(e) => setSearchDate(e.target.value)}
//           placeholder="Search by date"
//         />
//         <input
//           type="text"
//           value={searchCategory}
//           onChange={(e) => setSearchCategory(e.target.value)}
//           placeholder="Search by category"
//         />
//         <input
//           type="text"
//           value={searchUserRole}
//           onChange={(e) => setSearchUserRole(e.target.value)}
//           placeholder="Search by user role"
//         />
//         <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
//           <option value="Date">Date</option>
//           <option value="Term">Term</option>
//           <option value="Category">Category</option>
//           <option value="UserRole">User Role</option>
//         </select>
//         <button onClick={handleSearchButtonClick}>Search</button>
//       </div>
//       <div>
//         {searchResults.map((journal) => (
//           <JournalCard key={journal.id} journal={journal} />
//         ))}
//       </div>
//     </div>
//   );
// };













//my profile component without the modal
// import React, { useState, useEffect } from "react";
// import { GetUserById,EditProfile  } from "../Managers/UserManagers"


// export const MyProfile = () => {
//   const [userProfile, setUserProfile] = useState({
//     imageLocation: "",
//     displayName: "",
//     firstName: "",
//     lastName: "",
//     relationShip:"",
//     createDateTime:""
//   });

//   const [isEditing, setIsEditing] = useState(false); 

//   const createDateTime = new Date(userProfile.createDateTime);
//   const formattedCreationDate = createDateTime.toLocaleDateString();


//   const localAppUser = localStorage.getItem("user");
//   const AppUserObject = JSON.parse(localAppUser);
//   const userId = AppUserObject.id;

//   useEffect(() => {
//     GetUserById(userId)
//       .then((userProfile) => setUserProfile(userProfile))
//   }, [userId]); 

//   const handleSaveClick = () => {
//     EditProfile(userProfile) 
//       .then(() => {
//         // Fetch the updated profile after editing
//         GetUserById(userId)
//           .then((updatedProfile) => {
//             setUserProfile(updatedProfile);
//             setIsEditing(false); 
//           })
//       })
      
//   };

//   return (
//     <div>
//       <h1>{isEditing ? "Edit Profile" : "My Profile"}</h1>
//       {isEditing ? (
//         <form>
//           <div>
//             <label>Display Name:</label>
//             <input
//               type="text"
//               value={userProfile.displayName}
//               onChange={(e) =>
//                 setUserProfile({ ...userProfile, displayName: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label>First Name:</label>
//             <input
//               type="text"
//               value={userProfile.firstName}
//               onChange={(e) =>
//                 setUserProfile({ ...userProfile, firstName: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label>Last Name:</label>
//             <input
//               type="text"
//               value={userProfile.lastName}
//               onChange={(e) =>
//                 setUserProfile({ ...userProfile, lastName: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label>Image Location:</label>
//             <input
//               type="text"
//               value={userProfile.imageLocation}
//               onChange={(e) =>
//                 setUserProfile({ ...userProfile, imageLocation: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label>Relationship:</label>
//             <input
//               type="text"
//               value={userProfile.relationShip}
//               onChange={(e) =>
//                 setUserProfile({ ...userProfile, relationShip: e.target.value })
//               }
//             />
//           </div>

//           <button type="button" onClick={handleSaveClick}>
//             Save
//           </button>
//           <button type="button" onClick={() => setIsEditing(false)}>
//             Cancel
//           </button>
//         </form>
//       ) : (
//         <>
//           <div>
//             <strong>{userProfile.displayName}</strong>
//           </div>
//           <div>
//             <img src={userProfile.imageLocation} alt="User Profile" />
//           </div>
//           <div>
//             <strong>First Name:</strong> {userProfile.firstName}
//           </div>
//           <div>
//             <strong>Last Name:</strong> {userProfile.lastName}
//           </div>
//           <div>
//             <strong>Relationship:</strong> {userProfile.relationShip}
//           </div>
//           <button type="button" onClick={() => setIsEditing(true)}>
//              Edit Profile
//           </button>
//         </>
//       )}
//     </div>
//   );
// };



// import React, { useState, useEffect } from 'react';

// export const JournalSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchDate, setSearchDate] = useState('');
//   const [searchCategory, setSearchCategory] = useState('');
// //   const [searchUser, setSearchUser] = useState('');
//   const [searchUserRole, setSearchUserRole] = useState('');
//   const [searchType, setSearchType] = useState('Date'); // Default to Date
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     handleSearchButtonClick();
//   }, []);

//   const handleSearchButtonClick = () => {
//     let baseUrl = '/api/journal/';

//     if (searchType === 'Date') {
//       baseUrl += `searchbydate?searchDate=${encodeURIComponent(searchDate)}`;
//     } else if (searchType === 'Term') {
//       baseUrl += `searchbyterm?searchTerm=${encodeURIComponent(searchTerm)}`;
//     } else if (searchType === 'Category') {
//       baseUrl += `searchbycategory?categoryName=${encodeURIComponent(searchCategory)}`;
//     } else if (searchType === 'UserRole') {
//       baseUrl += `searchbyuserrole?roleName=${encodeURIComponent(searchUserRole)}`;
//     } 
//     // else if (searchType === 'User') {
//     //   baseUrl += `searchbyuser?searchValue=${encodeURIComponent(searchUser)}&searchType=${searchUserRole}`;
//     // }

//     fetch(baseUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         setSearchResults(data);
//       })
//   };

//   return (
//     <div>
//       <h1>Journal Search</h1>
//       <div>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by term"
//         />
//         <input
//           type="date"
//           value={searchDate}
//           onChange={(e) => setSearchDate(e.target.value)}
//           placeholder="Search by date"
//         />
//         <input
//           type="text"
//           value={searchCategory}
//           onChange={(e) => setSearchCategory(e.target.value)}
//           placeholder="Search by category"
//         />
//         {/* <input
//           type="text"
//           value={searchUser}
//           onChange={(e) => setSearchUser(e.target.value)}
//           placeholder="Search by user"
//         /> */}
//         <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
//           <option value="Date">Date</option>
//           <option value="Term">Term</option>
//           <option value="Category">Category</option>
//           {/* <option value="User">User</option> */}
//           <option value="UserRole">User Role</option>
//         </select>
//         <button onClick={handleSearchButtonClick}>Search</button>
//       </div>
//       <div>
//         {searchResults.map((journal) => (
//         <JournalCard key={journal.id} journal={journal} />

//         ))}
//       </div>
//     </div>
//   );
// };



// import React, { useState, useEffect } from 'react';
// import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import { SearchJournalByTerms } from '../../Managers/JournalManager';
// export const JournalSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchCategory, setSearchCategory] = useState('');
// //   const [searchUser, setSearchUser] = useState('');
// //   const [searchUserRole, setSearchUserRole] = useState('');
// //   const [searchType, setSearchType] = useState('Date'); // Default to Date
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     handleSearchButtonClick();
//   }, []);

//   const handleSearchInput = (event) => {
//     setSearchTerm(event.target.value)
// };

// const handleSearchButtonClick = (event) => {
//     event.preventDefault();

//     SearchJournalByTerms(searchTerm)
//     .then((res) => {
//         setSearchResults(res);
//     })

//     return (
//         <div>

//             <Form className="journal-form">
//                 <FormGroup>
//                     <Label for="searchTerm">Search:</Label>
//                     <Input
//                         type="text"
//                         id="searchTerm"
//                         value={searchTerm}
//                         onChange={handleSearchInput}
//                     />
//                 </FormGroup>

//                 <Button onClick={handleSearchButtonClick} color="primary">
//                     Search
//                 </Button>
//             </Form>
//             {searchResults.length > 0 && (
//                 <div>
//                     <h3>Search Results:</h3>
//                     <div>
//                         {searchResults.map((journal) => (
//                             <div key={journal.id}>
//                                 <h4>{journal.title}</h4>
//                                 <h4>{journal.content}</h4>
//                                 <h4>{journal.gratitude}</h4>
//                                 <h4>{journal.intention}</h4>
//                                 <p>Caption: {journal?.category?.name}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     )


// import React, { useState, useEffect } from "react";
// import { Card, Button, Col } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import { getJournalById } from "../Managers/JournalManager";
// import CommentList from "./Comment/CommentList";
// import DeleteJournal from "./Journal/DeleteJournal";
// import { DeleteJournalById } from "../Managers/JournalManager";
// import { AddComment } from "./Comment/AddComment";
// import EditJournal from "./Journal/EditJournal";
// import { useNavigate } from "react-router-dom";
// import { Picker } from "emoji-mart"; // Import emoji-mart components
// // import "emoji-mart/css/emoji-mart.css"; // Import emoji-mart styles

// export const JournalDetails = () => {
//   const [journal, setJournal] = useState({});
//   const [showComments, setShowComments] = useState(false);
//   const [showJournalEditForm, setShowJournalEditForm] = useState(false);
//   const [showAddCommentForm, setShowAddCommentForm] = useState(false);
//   const [selectedEmoji, setSelectedEmoji] = useState(null); // State for selected emoji
//   const [emojiCounts, setEmojiCounts] = useState({});

//   const navigate = useNavigate();
//   const { id } = useParams();

//   /* toggle function for controlling the visibility of the comment list:*/
//   const toggleComments = () => {
//     setShowComments((prevState) => !prevState);
//   };

//   useEffect(() => {
//     getJournalById(id).then(setJournal);
//   }, []);

//   if (!journal) {
//     return null;
//   }

//   const handleEditButtonClick = () => {
//     setShowJournalEditForm(true);
//   };

//   const handleCancelEditButtonClick = () => {
//     setShowJournalEditForm(false);
//   };

//   const handleJournalEditRequest = () => {
//     // After editing is complete, refresh the journal data and close the form
//     getJournalById(id).then(setJournal);
//     setShowJournalEditForm(false);
//   };

//   if (!journal) {
//     return null;
//   }

//   const handleDeleteJournal = () => {
//     DeleteJournalById(parseInt(id)).then(() => {
//       // Journal deleted successfully, navigate to the homepage
//       navigate("/homepage");
//     });
//   };

//   const formattedCreationDate = new Date(
//     journal.creationDate
//   ).toLocaleDateString();

//   const handleEmojiSelect = (emoji) => {
//     const emojiCode = emoji.id; // Use emoji code as the key
//     setEmojiCounts((prevCounts) => ({
//       ...prevCounts,
//       [emojiCode]: (prevCounts[emojiCode] || 0) + 1, // Increment count or initialize to 1
//     }));
//     setSelectedEmoji(emoji); // Set the selected emoji
//   };

//   const handleEmojiClick = (selectedEmoji) => {
//     const updatedEmojiCounts = { ...emojiCounts }; // Copy existing emojiCounts
//     if (selectedEmoji.id in updatedEmojiCounts) {
//       updatedEmojiCounts[selectedEmoji.id]++;
//     } else {
//       updatedEmojiCounts[selectedEmoji.id] = 1;
//     }
  
//     setEmojiCounts(updatedEmojiCounts);
  
//     handleEmojiClick(selectedEmoji, updatedEmojiCounts)
       
//   };

//   return (
//     <Col xs={8}>
//       <Card
//         className="journal-card"
//         style={{ width: "30rem", border: "1px solid lightblue" }}
//       >
//         <Card.Body>
//           <Card.Title>
//             <Link to={`/homepage`}>
//               <strong className="journal-title">
//                 {journal?.title}: ({formattedCreationDate})
//               </strong>
//             </Link>
//           </Card.Title>
//           <Card.Subtitle className="mb-2 text-muted">
//             <strong>{journal?.category?.name}</strong>
//           </Card.Subtitle>
//           <Card.Subtitle className="mb-2 text-muted">
//             <em>{journal?.content}</em>
//           </Card.Subtitle>{" "}
//           <br />
//           <Card.Subtitle className="mb-2 text-muted">
//             {" "}
//             Gratitude:<em>{journal?.gratitude}</em>
//           </Card.Subtitle>{" "}
//           <br />
//           <Card.Subtitle className="mb-2 text-muted">
//             What will make today/tomorrow great: <em>{journal?.intention}</em>
//           </Card.Subtitle>
//           <br />
//         </Card.Body>
//         {showComments && <CommentList journalId={id} />}
//         <Button onClick={toggleComments}>
//           {showComments ? "Hide Comments" : "View Comments"}
//         </Button>
//         <Button onClick={() => setShowAddCommentForm(true)}>Add Comment</Button>
//         {showAddCommentForm && (
//           <AddComment
//             journalId={+id}
//             setShowAddCommentForm={setShowAddCommentForm}
//           />
//         )}
//         {/* Emoji Picker */}
//         <Picker onSelect={handleEmojiSelect} /> {/* Display emoji picker */}
//         {selectedEmoji && (
//           <div>
//             <p>Selected Emoji: {selectedEmoji.native}</p>
//             {/* Display emoji count */}
//             {emojiCounts[selectedEmoji.id] > 0 && (
//               <p>Count: {emojiCounts[selectedEmoji.id]}</p>
//             )}
//                 <Button onClick={handleEmojiClick}>Submit Emoji</Button>
//           </div>
//         )}
//         <DeleteJournal
//           journalId={+id}
//           handleDeleteJournal={handleDeleteJournal}
//         />
//         {showJournalEditForm ? (
//           <EditJournal
//             journal={journal}
//             handleJournalEditRequest={handleJournalEditRequest}
//             handleCancelEditButtonClick={handleCancelEditButtonClick}
//           />
//         ) : (
//           <Button onClick={handleEditButtonClick}>Edit Journal</Button>
//         )}
//       </Card>
//     </Col>
//   );
// };


// export const MyJournalEntries = () => {
//     const [journals, setJournals] = useState([]);
  
//     const localAppUser = localStorage.getItem("user");
//     const AppUserObject = JSON.parse(localAppUser);
//     const userId = AppUserObject.id;
//   console.log(typeof(userId))//receiving appropriate id and type
  
//     useEffect(() => {
//       GetJournalsByUser(userId).then((allJournals) => setJournals(allJournals)
//       );
//       console.log(journals)
//     }, []);
  
  
  
//     return (
//       <Container className="journal-container">
//         <Row className="journal-list" mt-3>
//           {journals.map((journal) => (
//             <Col key={journal.id} xs={8}>
//               <Card className="journal-card" style={{ width: '18rem' }}>
//                 {/* sent journal as props to Journal */}
//                 <Journal journalProp={journal} />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     );
//   };
  


// import { Button, Form, FormGroup, Label, Input } from "reactstrap";


//   return (
//     <Form onSubmit={registerClick}>
//       <fieldset>
//         <FormGroup>
//           <Label htmlFor="displayName">Display Name</Label>
//           <Input
//             id="displayName"
//             type="text"
//             onChange={(e) => setDisplayName(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="imageLocation">Profile Image URL</Label>
//           <Input
//             id="imageLocation"
//             type="text"
//             onChange={(e) => setImageLocation(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="firstName">First Name</Label>
//           <Input
//             id="firstName"
//             type="text"
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="lastName">Last Name</Label>
//           <Input
//             id="lastName"
//             type="text"
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </FormGroup>
//         {/* User Role Dropdown */}
//         <FormGroup>
//           <Label htmlFor="userRole">Role</Label>
//           <Input
//             id="userRole"
//             type="select"
//             value={userRole}
//             onChange={(e) => setUserRole(e.target.value)}
//           >
//             <option value="" disabled>
//               Select Role
//             </option>
//             {userRolesList.map((role) => (
//               <option key={role.id} value={role.id}>
//                 {role.name}
//               </option>
//             ))}
//           </Input>
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="relationship">Relationship</Label>
//           <Input
//             id="relationship"
//             type="text"
//             onChange={(e) => setRelationship(e.target.value)}
//           />
//         </FormGroup>
//         {/* Link account to Kid User Dropdown */}
//         <FormGroup>
//           <Label htmlFor="childUserId">Link Account to Kid User</Label>
//           <Input
//             id="childUserId"
//             type="select"
//             value={childUserId}
//             onChange={(e) => setChildUserId(e.target.value)}
//           >
//             <option value="" disabled>
//               Select Kid User
//             </option>
//             {childUsersList.map((kidUser) => (
//               <option key={kidUser.id} value={kidUser.id}>
//                 {kidUser.name}
//               </option>
//             ))}
//           </Input>
//         </FormGroup>
//         <FormGroup>
//           <Label for="email">Email</Label>
//           <Input
//             id="email"
//             type="text"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="confirmPassword">Confirm Password</Label>
//           <Input
//             id="confirmPassword"
//             type="password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Button>Register</Button>
//         </FormGroup>
//       </fieldset>
//     </Form>
//   );
// }


// register(user, password)
// .then((response) => response.json())
// .then((data) => {
//     const userId = data.Id; // Assuming the response is a JSON object with the "Id" property
//    console.log(userId);  


// export const register = (userObject, password) => {
//     return fetch(`${baseUrl}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userObject),
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok.");
//       }
//       return response.json();
//     })
//     .then((savedUser) => {
//       // Save the user to local storage
//       localStorage.setItem("user", JSON.stringify(savedUser));
//       return savedUser; // Return the savedUser for further processing if needed
//     });
//   };


/*---------------------------- Prev Header code ----------------------------------------*/


// import React, { useState } from 'react';
// import { NavLink as RRNavLink } from "react-router-dom";
// import { logout } from '../Managers/UserManagers';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// export default function Header({ isLoggedIn, setIsLoggedIn }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       <Navbar bg="light" expand="md">
//         <Navbar.Brand as={RRNavLink} to="/">MemoryPrints</Navbar.Brand>
//         <Navbar.Toggle onClick={toggle} />
//         <Navbar.Collapse isOpen={isOpen}>
//           <Nav className="mr-auto">
//             {isLoggedIn && (
//               <>
//                 <Nav.Link as={RRNavLink} to="/">Homepage</Nav.Link>
//                 <Nav.Link as={RRNavLink} to="/journalentries">All Entries</Nav.Link>
//               </>
//             )}
//           </Nav>
//           <Nav>
//             {isLoggedIn ? (
//               <>
//                 <Nav.Link as={RRNavLink} to="/userProfile">My Profile</Nav.Link>
//                 <Nav.Link
//                   aria-current="page"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     logout()
//                     setIsLoggedIn(false)
//                   }}
//                 >
//                   Logout
//                 </Nav.Link>
//               </>
//             ) : (
//               <>
//                 <Nav.Link as={RRNavLink} to="/login">Login</Nav.Link>
//                 <Nav.Link as={RRNavLink} to="/register">Register</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// }





// import React, { useState } from 'react';
// import { NavLink as RRNavLink } from "react-router-dom";
// import { logout } from '../Managers/UserManagers';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink
// } from 'reactstrap';

// export default function Header({isLoggedIn, setIsLoggedIn}) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       <Navbar color="light" light expand="md">
//         <NavbarBrand tag={RRNavLink} to="/">MemoryPrints</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mr-auto" navbar>
//             { /* When isLoggedIn === true, we will render the Home link */ }
//             {isLoggedIn &&
//               <NavItem>
//                 <NavLink tag={RRNavLink} to="/">Homepage</NavLink>
                
//               </NavItem>
//             }
//           </Nav>
//           <Nav className="mr-auto" navbar>
//             { /* When isLoggedIn === true, we will render the all entries link */ }
//             {isLoggedIn &&
//               <NavItem>
//                 <NavLink tag={RRNavLink} to="/journalentries">All Entries</NavLink>
//               </NavItem>
//             }
//           </Nav>
//           <Nav navbar>
//             {isLoggedIn &&
//               <>
//               <NavItem>
//                 <NavLink tag={RRNavLink} to="/userProfile">My Profile</NavLink>
//               </NavItem>
//                 <NavItem>
//                   <a aria-current="page" className="nav-link"
//                     style={{ cursor: "pointer" }} onClick={() => {
//                       logout()
//                       setIsLoggedIn(false)
//                     }}>Logout</a>
//                 </NavItem>
                
//               </>
//             }
//             {!isLoggedIn &&
//               <>
//                 <NavItem>
//                   <NavLink tag={RRNavLink} to="/login">Login</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={RRNavLink} to="/register">Register</NavLink>
//                 </NavItem>
//               </>
//             }
//           </Nav>
          
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { useNavigate } from 'react-router-dom';
// import { NavLink } from 'react-bootstrap';
// import './Header.css';

// export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
//   const navigate = useNavigate();

//   return (
//     <Navbar className='navbar' expand="lg" bg="navbar-background" variant="dark">
//       <Navbar.Brand href="/" bsPrefix="navbar-brand-custom">MemoryPrints</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         {isLoggedIn ? (
//           <Nav className="ms-auto">
//             <NavLink href="/" bsPrefix="nav-link-custom">HomePage</NavLink>
//             <NavLink href="/journalentries" bsPrefix="nav-link-custom">All Entries</NavLink>
//             <NavLink href="/myprofile" bsPrefix="nav-link-custom">My Profile</NavLink>
            
//             {/* Uncomment the following line when the 'Profile' link is available */}
//             {/* <NavLink href="/profile" bsPrefix="nav-link-custom">Profile</NavLink> */}
            
//             <NavLink
//               bsPrefix="nav-link-custom"
//               onClick={() => {
//                 // localStorage.removeItem("user");
//                 setIsLoggedIn(false)
//                 // navigate("/login", { replace: true });
//               }}
//             >
//               Logout
//             </NavLink>
//           </Nav>
//         ) : (
//           <Nav className="ms-auto">
//             <NavLink href="/login" bsPrefix="nav-link-custom">Login</NavLink>
//             <NavLink href="/register" bsPrefix="nav-link-custom">Register</NavLink>
//           </Nav>
//         )}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };
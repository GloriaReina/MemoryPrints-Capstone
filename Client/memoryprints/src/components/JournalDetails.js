import React, { useState, useEffect } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getJournalById } from "../Managers/JournalManager";
import CommentList from "./Comment/CommentList";
import DeleteJournal from "./Journal/DeleteJournal";
import { DeleteJournalById } from "../Managers/JournalManager";
import { AddComment } from "./Comment/AddComment";
import EditJournal from "./Journal/EditJournal";
import { useNavigate } from "react-router-dom";

import "./JournalDetails.css"
// import JournalReactions from "./Journal/JournalReactions";


const JournalDetails = () => {
  const [journal, setJournal] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [showJournalEditForm, setShowJournalEditForm] = useState(false);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false); 

  const navigate = useNavigate ()
  const { id } = useParams();

  /* toggle function for controlling the visibility of the comment list:*/
  const toggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  useEffect(() => {
    getJournalById(id).then(setJournal);
  }, []);

  if (!journal) {
    return null;
  }

  const handleEditButtonClick = () => {
    setShowJournalEditForm(true);
  };

  const handleCancelEditButtonClick = () => {
    setShowJournalEditForm(false);
  };

  const handleJournalEditRequest = () => {
    // After editing is complete, refresh the journal data and close the form
    getJournalById(id).then(setJournal);
    setShowJournalEditForm(false);
  };

  if (!journal) {
    return null;
  }

  const handleDeleteJournal = () => {
    DeleteJournalById(parseInt(id)) 
    .then(() => {
      // Journal deleted successfully, navigate to the homepage
      navigate("/homepage");
    })
  }


  const formattedCreationDate = new Date(
    journal.creationDate
  ).toLocaleDateString();

  return (
    <div className="details-container">
    <Col xs={8}>
      <Card
        className="journal-card"
        style={{ width: "60rem", border: "1px solid lightblue" }}
      >
        <Card.Body>
          <Card.Title>
           
              <strong className="journal-title">
                {journal?.title}
              </strong>
           
          </Card.Title> <br />
          {/* <Card.Subtitle className="subtitle">
            <strong>{journal?.category?.name}</strong>
          </Card.Subtitle> */}
          <Card.Subtitle className="subtitle">
            <em>{journal?.content}</em>
          </Card.Subtitle>{" "}
          <br />
          <Card.Subtitle className="subtitle">
            {" "}
            Gratitude: <em>{journal?.gratitude}</em>
          </Card.Subtitle>{" "}
          <br />
          <Card.Subtitle className="subtitle">
            What will make today/tomorrow great: <em>{journal?.intention}</em>
          </Card.Subtitle><br />
          <Card.Subtitle className="subtitle"> Created On:<em>{formattedCreationDate}</em> </Card.Subtitle>

          <br />
        </Card.Body>
        <div className="button-group-left">
        {showComments && <CommentList journalId={id} />}
        <Button className='btn--outline' onClick={toggleComments}>
          {showComments ? "Hide Comments" : "View Comments"}
        </Button>
        <Button className='btn--outline' onClick={() => setShowAddCommentForm(true)}>Add Comment</Button> 
        {showAddCommentForm && <AddComment journalId={+id} setShowAddCommentForm={setShowAddCommentForm} toggleComments ={toggleComments } />}
        </div>
        <div className="button-group-right">
        <DeleteJournal journalId={+id} handleDeleteJournal={handleDeleteJournal} />
        {showJournalEditForm ? (
          <EditJournal journal={journal} handleJournalEditRequest={handleJournalEditRequest} handleCancelEditButtonClick ={handleCancelEditButtonClick} />
        ) : (
          <Button className='btn--outline' onClick={handleEditButtonClick}>Edit Journal</Button>
        )}
        </div>
      </Card>
      {/* <JournalReactions journalId={id} /> */}
    </Col>
    </div>
  );
};

export default JournalDetails


/*workin code before styling button*/

// const JournalDetails = () => {
//   const [journal, setJournal] = useState({});
//   const [showComments, setShowComments] = useState(false);
//   const [showJournalEditForm, setShowJournalEditForm] = useState(false);
//   const [showAddCommentForm, setShowAddCommentForm] = useState(false); 

//   const navigate = useNavigate ()
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
//     DeleteJournalById(parseInt(id)) 
//     .then(() => {
//       // Journal deleted successfully, navigate to the homepage
//       navigate("/homepage");
//     })
//   }


//   const formattedCreationDate = new Date(
//     journal.creationDate
//   ).toLocaleDateString();

//   return (
//     <div className="details-container">
//     <Col xs={8}>
//       <Card
//         className="journal-card"
//         style={{ width: "25rem", border: "1px solid lightblue" }}
//       >
//         <Card.Body>
//           <Card.Title>
           
//               <strong className="journal-title">
//                 {journal?.title}
//               </strong>
           
//           </Card.Title> <br />
//           {/* <Card.Subtitle className="subtitle">
//             <strong>{journal?.category?.name}</strong>
//           </Card.Subtitle> */}
//           <Card.Subtitle className="subtitle">
//             <em>{journal?.content}</em>
//           </Card.Subtitle>{" "}
//           <br />
//           <Card.Subtitle className="subtitle">
//             {" "}
//             Gratitude: <em>{journal?.gratitude}</em>
//           </Card.Subtitle>{" "}
//           <br />
//           <Card.Subtitle className="subtitle">
//             What will make today/tomorrow great: <em>{journal?.intention}</em>
//           </Card.Subtitle><br />
//           <Card.Subtitle className="subtitle"> Created On:<em>{formattedCreationDate}</em> </Card.Subtitle>

//           <br />
//         </Card.Body>
//         {showComments && <CommentList journalId={id} />}
//         <Button onClick={toggleComments}>
//           {showComments ? "Hide Comments" : "View Comments"}
//         </Button>
//         <Button onClick={() => setShowAddCommentForm(true)}>Add Comment</Button> 
//         {showAddCommentForm && <AddComment journalId={+id} setShowAddCommentForm={setShowAddCommentForm} toggleComments ={toggleComments } />}
//         <DeleteJournal journalId={+id} handleDeleteJournal={handleDeleteJournal} />
//         {showJournalEditForm ? (
//           <EditJournal journal={journal} handleJournalEditRequest={handleJournalEditRequest} handleCancelEditButtonClick ={handleCancelEditButtonClick} />
//         ) : (
//           <Button onClick={handleEditButtonClick}>Edit Journal</Button>
//         )}
//       </Card>
//       {/* <JournalReactions journalId={id} /> */}
//     </Col>
//     </div>
//   );
// };


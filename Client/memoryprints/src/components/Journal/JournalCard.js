import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";

const JournalCard = ({ journal }) => {
    const createDateTime = new Date(journal?.journal?.creationDate);
    const formattedCreationDate = createDateTime.toLocaleDateString();   
    
    console.log(journal)
    

    return (
        // <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>
            <Link to={`/journals/${journal?.journalId}`}>
                  <strong className="journal-title">{journal?.journal?.title}</strong>
                </Link>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><em>{journal?.journal?.category?.name}</em></Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted"> Created: {formattedCreationDate}</Card.Subtitle>
          </Card.Body>
        //   </Card>
      );
    
    // return (
    //     <div className="card mb-3">
    //         <div className="card-body">
    //             <h5 className="card-title">
    //                 <Link to={`/journals/${journal?.journalId}`}>
    //                     <strong className="journal-title">
    //                         {journal?.journal?.title}
    //                     </strong>
    //                 </Link>
    //             </h5>
    //             <h6 className="card-subtitle mb-2 text-muted">
    //                 <em>{journal?.journal?.category?.name}</em>
    //             </h6>
    //             <h6 className="card-subtitle mb-2 text-muted">
    //                 Created: {formattedCreationDate}
    //             </h6>
               
    //         </div>
    //     </div>
    // );
};

export default JournalCard;

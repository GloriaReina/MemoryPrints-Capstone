import React from 'react';
import { Link } from 'react-router-dom';

const JournalCard = ({ journal }) => {
    const createDateTime = new Date(journal?.journal?.creationDate);
    const formattedCreationDate = createDateTime.toLocaleDateString();   
    
    console.log(journal)
    
    
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/journals/${journal.id}`}>
                        <strong className="journal-title">
                            {journal?.journal?.title}: ({formattedCreationDate})
                        </strong>
                    </Link>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    <em>{journal?.journal?.category?.name}</em>
                </h6>
                {/* <h6 className="card-subtitle mb-2 text-muted">
                    Created: {formattedCreationDate}
                </h6>
                <p className="card-text">{journal.gratitude}</p>
                <p className="card-text">{journal.intention}</p> */}
                
            </div>
        </div>
    );
};

export default JournalCard;

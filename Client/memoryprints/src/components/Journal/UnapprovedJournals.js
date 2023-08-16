import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { GetAllUnapprovedJournals, ApproveJournal } from "../../Managers/JournalManager";
import "./UnapprovedJournals.css"


export const UnapprovedJournals = () => {
  const [unapprovedJournals, setUnapprovedJournals] = useState([]);

  useEffect(() => {
    fetchUnapprovedJournals();
  }, []);

  const fetchUnapprovedJournals = () => {
    GetAllUnapprovedJournals().then((journalList) => {
      setUnapprovedJournals(journalList);
    });
  };

  const handleApproveClick = (journalId) => {
    ApproveJournal(journalId).then(() => {
      fetchUnapprovedJournals();
    });
  };

  return (
    <div className="unapproved-journals-container">
      <h2 className="page-title">Unapproved Journals</h2>
      <Table striped bordered hover className="journals-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Gratitude</th>
            <th>Intention</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {unapprovedJournals.map((journal) => (
            <tr key={journal.id}>
              <td>{journal.title}</td>
              <td>{journal.content}</td>
              <td>{journal.gratitude}</td>
              <td>{journal.intention}</td>
              <td>
                <Button
                  onClick={() => handleApproveClick(journal.id)}
                  variant="success"
                >
                  Approve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};


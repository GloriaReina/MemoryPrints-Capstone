import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { GetAllUnapprovedJournals, ApproveJournal } from "../../Managers/JournalManager";



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

  console.log(unapprovedJournals)

  const handleApproveClick = (journalId) => {
    ApproveJournal(journalId).then(() => {
      fetchUnapprovedJournals();
    });
  };

  return (
    <div>
      <h2>Unapproved Journals</h2>
      <Table striped bordered hover>
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



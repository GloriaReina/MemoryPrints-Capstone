import { useEffect, useState } from "react";
import { GetJournalsByUser } from "../Managers/JournalManager";
import { Journal } from "./Journal";
import { AddJournalForm } from "./AddJournalForm";
import "./MyJournalEntries.css"
import {
  Container,
  Card,
  Col,
  Row
} from "react-bootstrap";

export const MyJournalEntries = () => {
  const [journals, setJournals] = useState([]);

  const localAppUser = localStorage.getItem("user");
  const AppUserObject = JSON.parse(localAppUser);
  const userId = AppUserObject.id;


  useEffect(() => {
    GetJournalsByUser(userId).then((allJournals) => setJournals(allJournals)
    );
   
  }, [userId]);// Add the userId as a dependency to re-fetch journals when userId changes; do i need this?

  const renderedJournals = journals.map((journal) => (
    <Col key={journal.id} xs={8}>
      <Card className="journal-card" style={{ width: '25rem', border: '1px solid lightblue' }} >
        <Journal journalProp={journal} />
      </Card>
    </Col>
  ));


  return (
    <Container className="journal-container">
      <Row className="journal-list" mt-3>
        <AddJournalForm GetJournalsByUser = {GetJournalsByUser}/>
      {renderedJournals}
      </Row>
    </Container>
  );
};

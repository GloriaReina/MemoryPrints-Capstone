import { useEffect, useState } from "react";
import { GetAllSharedJournalsByKidUserId } from "../../Managers/JournalSharingManager";
import JournalCard from "./JournalCard";
import {
  Container,
  Card,
  Col,
  Row
} from "react-bootstrap";

export const SharedJournals = () => {
  const [sharedJournals, setSharedJournals] = useState([]);

  const localAppUser = localStorage.getItem("user");
  const AppUserObject = JSON.parse(localAppUser);
  const kidUserId = AppUserObject.id;


  useEffect(() => {
     GetAllSharedJournalsByKidUserId(kidUserId).then((sharedJournals) => setSharedJournals(sharedJournals)
    );
   
  }, [kidUserId]);// Add the userId as a dependency to re-fetch journals when userId changes; do i need this?

  const renderedJournals = sharedJournals.map((journal) => (
    <Col key={journal.id} xs={8}>
      <Card className="journal-card" style={{ width: '30rem', border: '1px solid lightblue' }} >
        <JournalCard journal={journal} />
      </Card>
    </Col>
  ));


  return (
    <Container className="journal-container">
      <Row className="journal-list" mt-3> 
      {renderedJournals}
      </Row>
    </Container>
  );
};
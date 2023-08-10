import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


export const Journal = ({journalProp}) => {
    const createDateTime = new Date(journalProp.creationDate);
    const formattedCreationDate = createDateTime.toLocaleDateString();

    return (
        // <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>
            <Link to={`/journals/${journalProp.id}`}>
                  <strong className="journal-title">{journalProp?.title}: ({formattedCreationDate})</strong>
                </Link>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><em>{journalProp?.category?.name}</em></Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Created: {formattedCreationDate}</Card.Subtitle>

            <Card.Text>
            {journalProp.Gratitude}
            </Card.Text>
            <Card.Text>
            {journalProp.Intention}
            </Card.Text>
            {/* <Card.Link href="#">edit button?Modal</Card.Link>
            <Card.Link href="#">Delete Button? Modal</Card.Link> */}
          </Card.Body>
        // </Card>
      );
};
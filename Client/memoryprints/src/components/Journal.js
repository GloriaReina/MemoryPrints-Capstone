import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./Journal.css"

export const Journal = ({journalProp}) => {
   
  console.log(journalProp)
  const createDateTime = new Date(journalProp.creationDate);
    const formattedCreationDate = createDateTime.toLocaleDateString();


    
    return (
        <Card style={{ width: '25rem', border: '1px solid lightblue' }} >
          <Card.Body>
            <Card.Title>
            <Link to={`/journals/${journalProp.id}`} className="journal-title">
                  <strong >{journalProp?.title}</strong>
                </Link>
            </Card.Title>
            <Card.Subtitle className="subtitle"><em>{journalProp?.category?.name}</em></Card.Subtitle>
            <Card.Subtitle className="subtitle"> Written On: {formattedCreationDate}</Card.Subtitle>

            <Card.Text>
            {journalProp.Gratitude}
            </Card.Text>
            <Card.Text>
            {journalProp.Intention}
            </Card.Text>
          </Card.Body>
          </Card>
      );
};
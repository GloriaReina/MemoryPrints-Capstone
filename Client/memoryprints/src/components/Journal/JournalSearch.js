import { Journal } from "../Journal";
import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { GetAllJournals, SearchJournals } from "../../Managers/JournalManager";
import JournalCard from "./JournalCard"; 

export const JournalSearch = () => {
  const [journals, setJournals] = useState([]);
  const [categoryQuery, setCategoryQuery] = useState("");
  const [userRoleQuery, setUserRoleQuery] = useState("");
  const [creationDateQuery, setCreationDateQuery] = useState("");
  const [userNameQuery, setUserNameQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const getAllJournals = async () => {
   
          const allJournals = await GetAllJournals();
          setJournals(allJournals);
        
      };
    
      useEffect(() => {
        getAllJournals();
      }, []);

  const handleCategorySearch = async () => {
    if (categoryQuery.trim() === "") {
      setShowAlert(true);
    } else {
      try {
        const response = await SearchJournals(categoryQuery);
        setSearchResults(response);
        setShowAlert(false);
      } catch (error) {
        console.error("Error searching journals:", error);
      }
    }
  };

  const handleUserRoleSearch = async () => {
    if (userRoleQuery.trim() === "") {
      setShowAlert(true);
    } else {
      try {
        const response = await SearchJournals(userRoleQuery);
        setSearchResults(response);
        setShowAlert(false);
      } catch (error) {
        console.error("Error searching journals:", error);
      }
    }
  };

  // const handleCreationDateSearch = async () => {
  //   if (creationDateQuery.trim() === "") {
  //     setShowAlert(true);
  //   } else {
  //     try {
  //       // Format the date in ISO-8601 format
  //       const isoDate = new Date(creationDateQuery).toISOString();
  //       const response = await SearchJournals(isoDate); // Pass the ISO-8601 formatted date
  //       setSearchResults(response);
  //       setShowAlert(false);
  //     } catch (error) {
  //       console.error("Error searching journals:", error);
  //     }
  //   }
  // };

  const handleUserNameSearch = async () => {
    if (userNameQuery.trim() === "") {
      setShowAlert(true);
    } else {
      try {
        const response = await SearchJournals(userNameQuery);
        setSearchResults(response);
        setShowAlert(false);
      } catch (error) {
        console.error("Error searching journals:", error);
      }
    }
  };

  const handleCancelSearch = () => {
    setCategoryQuery("");
    setUserRoleQuery("");
    // setCreationDateQuery("");
    setUserNameQuery("");
    setSearchResults([]);
    setShowAlert(false);
  };

  const emptySearchAlert = () => {
    return (
      <Alert variant="danger" key={"danger"}>
        <div>
          Please enter a search value.{" "}
          <Link onClick={() => setShowAlert(false)}>clear</Link>
        </div>
      </Alert>
    );
  };

  
  return (
    <Container fluid className="journal-list">
      <Row>
        <Col>
          <div>
            <form className="journal-search-form">
              <input
                type="text"
                id="categoryQuery"
                value={categoryQuery}
                onChange={(e) => setCategoryQuery(e.target.value)}
                placeholder="Search by Category"
              />
              <Button onClick={handleCategorySearch}>Search by Category</Button>
              {categoryQuery && (
                <Button onClick={handleCancelSearch}>Cancel</Button>
              )}
            </form>
          </div>

          <div>
            <form className="journal-search-form">
              <input
                type="text"
                id="userRoleQuery"
                value={userRoleQuery}
                onChange={(e) => setUserRoleQuery(e.target.value)}
                placeholder="Search by User Role"
              />
              <Button onClick={handleUserRoleSearch}>Search by User Role</Button>
              {userRoleQuery && (
                <Button onClick={handleCancelSearch}>Cancel</Button>
              )}
            </form>
          </div>

          {/* <div>
            <form className="journal-search-form">
              <input
                type="text"
                id="creationDateQuery"
                value={creationDateQuery}
                onChange={(e) => setCreationDateQuery(e.target.value)}
                placeholder="Search by Creation Date"
              />
              <Button onClick={handleCreationDateSearch}>Search by Creation Date</Button>
              {creationDateQuery && (
                <Button onClick={handleCancelSearch}>Cancel</Button>
              )}
            </form>
          </div> */}

          <div>
            <form className="journal-search-form">
              <input
                type="text"
                id="userNameQuery"
                value={userNameQuery}
                onChange={(e) => setUserNameQuery(e.target.value)}
                placeholder="Search by User's Name"
              />
              <Button onClick={handleUserNameSearch}>Search by User's Name</Button>
              {userNameQuery && (
                <Button onClick={handleCancelSearch}>Cancel</Button>
              )}
            </form>
          </div>
          {searchResults.length > 0 && (
  <div>
    <h3>Search Results:</h3>
    {searchResults.map((journal) => (
      <Card key={journal.id} style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>
            <Link to={`/journals/${journal.id}`} className="journal-title">
              <strong >{journal?.title}</strong>
            </Link>
          </Card.Title>
          <Card.Subtitle className="subtitle">
            <em>{journal?.category?.name}</em>
          </Card.Subtitle>
          <Card.Subtitle className="subtitle">
            Created: {new Date(journal?.creationDate).toLocaleDateString()}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    ))}
  </div>
)}
          {/*Display all journals when searchResults is empty */}
           {searchResults.length === 0 && (
            <div>
              <h3>All Journals:</h3>
              {journals.map((journal) => (
                <Journal key={journal.id} journalProp={journal} />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};





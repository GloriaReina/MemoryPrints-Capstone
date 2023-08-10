import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { Alert } from "react-bootstrap";
import { GetAllJournals, SearchJournals } from "../../Managers/JournalManager";
import JournalCard from "./JournalCard";
import { Journal } from "../Journal";

export const JournalSearch = () => {
  const [journals, setJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const getAllJournals = async () => {
   
      const allJournals = await GetAllJournals();
      setJournals(allJournals);
    
  };

  useEffect(() => {
    getAllJournals();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowAlert(false);
  };

  const handleSearchButtonClick = async (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      setShowAlert(true);
    } else {
      try {
        const response = await SearchJournals(searchQuery);
        setSearchResults(response);
        setShowAlert(false);
      } catch (error) {
        console.error("Error searching journals:", error);
      }
    }
  };

  const handleCancelSearch = () => {
    setSearchQuery("");
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
                id="searchQuery"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <Button onClick={handleSearchButtonClick} >
                Search
              </Button>
              {/* Show cancel button when search query is not empty */}
              {searchQuery && (
                <Button onClick={handleCancelSearch}>Cancel
                </Button>
              )}

              {showAlert && emptySearchAlert()}
            </form>
          </div>

          {searchResults.length > 0 && (
            <div>
              <div>
                <Link onClick={handleCancelSearch}>Cancel</Link>
              </div>
              <h3>Search Results:</h3>
              {searchResults.map((journal) => (
                <Journal key={journal.id} journalProp={journal} />
              ))}
            </div>
          )}

          {/* Display all journals when searchResults is empty */}
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

// import React, { useState, useEffect } from 'react';
// import JournalCard from './JournalCard';

// export const JournalSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchDate, setSearchDate] = useState('');
//   const [searchCategory, setSearchCategory] = useState('');
//   const [searchUserRole, setSearchUserRole] = useState('');
//   const [searchType, setSearchType] = useState('Date'); // Default to Date
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     handleSearchButtonClick();
//   }, []);

//   const handleSearchButtonClick = () => {
//     let baseUrl = '/api/journal/';

//     switch (searchType) {
//       case 'Date':
//         baseUrl += `searchbydate?searchDate=${encodeURIComponent(searchDate)}`;
//         break;
//       case 'Term':
//         baseUrl += `searchbyterm?searchTerm=${encodeURIComponent(searchTerm)}`;
//         break;
//       case 'Category':
//         baseUrl += `searchbycategory?categoryName=${encodeURIComponent(searchCategory)}`;
//         break;
//       case 'UserRole':
//         baseUrl += `searchbyuserrole?roleName=${encodeURIComponent(searchUserRole)}`;
//         break;
//       default:
//         break;
//     }

//     fetch(baseUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         setSearchResults(data);
//       });
//   };

//   console.log('searchResults:', searchResults);

//   return (
//     <div>
//       <h1>Journal Search</h1>
//       <div>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search by term"
//         />
//         <input
//           type="date"
//           value={searchDate}
//           onChange={(e) => setSearchDate(e.target.value)}
//           placeholder="Search by date"
//         />
//         <input
//           type="text"
//           value={searchCategory}
//           onChange={(e) => setSearchCategory(e.target.value)}
//           placeholder="Search by category"
//         />
//         <input
//           type="text"
//           value={searchUserRole}
//           onChange={(e) => setSearchUserRole(e.target.value)}
//           placeholder="Search by user role"
//         />
//         <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
//           <option value="Date">Date</option>
//           <option value="Term">Term</option>
//           <option value="Category">Category</option>
//           <option value="UserRole">User Role</option>
//         </select>
//         <button onClick={handleSearchButtonClick}>Search</button>
//       </div>
//       <div>
//         {searchResults.map((journal) => (
//           <JournalCard key={journal.id} journal={journal} />
//         ))}
//       </div>
//     </div>
//   );
// };

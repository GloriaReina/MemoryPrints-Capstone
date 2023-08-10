import React, { useState, useEffect } from 'react';
import JournalCard from './JournalCard';

export const JournalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchUserRole, setSearchUserRole] = useState('');
  const [searchType, setSearchType] = useState('Date'); // Default to Date
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    handleSearchButtonClick();
  }, []);

  const handleSearchButtonClick = () => {
    let baseUrl = '/api/journal/';

    if (searchType === 'Date') {
      baseUrl += `searchbydate?searchDate=${encodeURIComponent(searchDate)}`;
    } else if (searchType === 'Term') {
      baseUrl += `searchbyterm?searchTerm=${encodeURIComponent(searchTerm)}`;
    } else if (searchType === 'Category') {
      baseUrl += `searchbycategory?categoryName=${encodeURIComponent(searchCategory)}`;
    } else if (searchType === 'UserRole') {
      baseUrl += `searchbyuserrole?roleName=${encodeURIComponent(searchUserRole)}`;
    } 

    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
  };

  return (
    <div>
      <h1>Journal Search</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by term"
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          placeholder="Search by date"
        />
        <input
          type="text"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          placeholder="Search by category"
        />
         <input
          type="text"
          value={searchUserRole}
          onChange={(e) => setSearchUserRole(e.target.value)}
          placeholder="Search by user role"
        />
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="Date">Date</option>
          <option value="Term">Term</option>
          <option value="Category">Category</option>
          <option value="UserRole">User Role</option>
        </select>
        <button onClick={handleSearchButtonClick}>Search</button>
      </div>
      <div>
        {searchResults.map((journal) => (
        <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>
    </div>
  );
};

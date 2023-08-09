import React, { useState, useEffect } from 'react';


const JournalSearch = () => {
const [searchTerm, setSearchTerm] = useState('');
const [searchDate, setSearchDate] = useState('');
const [searchCategory, setSearchCategory] = useState('');
const [searchUser, setSearchUser] = useState('');
const [searchUserRole, setSearchUserRole] = useState('');
const [searchType, setSearchType] = useState('FirstName'); // Default to FirstName
const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
    // Fetch data initially when the component mounts
    fetchJournalData();
  }, []);

  const fetchJournalData = async () => {
    let apiUrl = '/api/journal/search';

    if (searchType === 'Date') {
      apiUrl = `/api/Journal/searchbydate?searchDate=${encodeURIComponent(searchDate)}`;
    } else if (searchType === 'Term') {
      apiUrl = `/api/Journal/searchbyterm?searchTerm=${encodeURIComponent(searchTerm)}`;
    } else if (searchType === 'Category') {
      apiUrl = `/api/Journal/searchbycategory?categoryName=${encodeURIComponent(searchCategory)}`;
    } else if (searchType === 'User') {
      apiUrl = `/api/Journal/searchbyuser?searchValue=${encodeURIComponent(searchUser)}&searchType=${searchType}`;
    } else if (searchType === 'UserRole') {
      apiUrl = `/api/Journal/searchbyuserrole?roleName=${encodeURIComponent(searchUserRole)}`;
    }
  
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
    }








}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuoteCard from '../components/QuoteCard';
import QuoteFilter from '../components/QuoteFilter';
import styled from 'styled-components';

// Add a styled container for the quotes list
const QuotesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; // Add gap between quote cards
  padding: 20px;
`;

const ViewQuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  // Fetch quotes from the backend
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(`/api/quotes`);
        setQuotes(response.data);
        setFilteredQuotes(response.data);
      } catch (err) {
        console.error('Error fetching quotes:', err);
      }
    };
    fetchQuotes();
  }, []);

  // Handle filtering
  const handleFilter = ({ author, year }) => {
    let filtered = quotes;
    if (author) {
      filtered = filtered.filter((q) => q.author.toLowerCase().includes(author.toLowerCase()));
    }
    if (year) {
      filtered = filtered.filter((q) => q.year.toString() === year);
    }
    setFilteredQuotes(filtered);
  };

  // Handle sorting
  const handleSort = (order) => {
    let sorted = [...filteredQuotes];
    if (order === 'asc') {
      sorted.sort((a, b) => a.year - b.year);
    } else if (order === 'desc') {
      sorted.sort((a, b) => b.year - a.year);
    }
    setFilteredQuotes(sorted);
  };

  return (
    <div>
      <QuoteFilter onFilter={handleFilter} onSort={handleSort} />
      <QuotesListContainer>
      {filteredQuotes.map((quote) => (
        <QuoteCard key={quote._id} quote={quote} />
      ))}
      </QuotesListContainer>
    </div>
  );
};

export default ViewQuotesPage;
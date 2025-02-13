import React from 'react';
import axios from 'axios';
import QuoteForm from '../components/QuoteForm';

const AddQuotePage = ({ onAddQuote }) => {
  const handleAddQuote = async (newQuote) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/quotes`, newQuote);
      onAddQuote();
    } catch (err) {
      console.error('Error adding quote:', err);
    }
  };

  return (
    <div>
      <QuoteForm onAddQuote={handleAddQuote} />
    </div>
  );
};

export default AddQuotePage;
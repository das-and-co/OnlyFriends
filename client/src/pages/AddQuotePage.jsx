import React from 'react';
import QuoteForm from '../components/QuoteForm';

const AddQuotePage = ({ onAddQuote }) => {
  return (
    <div>
      <QuoteForm onAddQuote={onAddQuote} />
    </div>
  );
};

export default AddQuotePage;
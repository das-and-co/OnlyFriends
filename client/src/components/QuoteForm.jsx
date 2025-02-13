import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  margin: 0 auto 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ffd700;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive;
  background-color: #0a192f;
  color: #ffd700;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff8c00;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ffd700;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive;
  background-color: #0a192f;
  color: #ffd700;
  outline: none;
  transition: border-color 0.3s ease;
  resize: vertical;

  &:focus {
    border-color: #ff8c00;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background: #ffd700;
  color: #0a192f;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ff8c00;
  }
`;

const QuoteForm = ({ onAddQuote }) => {
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [quote, setQuote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !year || !quote) {
      alert('Please fill in all fields: Author, Year, and Quote.');
      return;
    }
    onAddQuote({ author, year, quote });
    setAuthor('');
    setYear('');
    setQuote('');
  };

  return (
    <FormContainer>
      <Input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        min="1900"
        max={new Date().getFullYear()}
      />
      <TextArea
        placeholder="Quote"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
      />
      <AddButton onClick={handleSubmit}>Add Quote</AddButton>
    </FormContainer>
  );
};

export default QuoteForm; // Ensure this is a default export
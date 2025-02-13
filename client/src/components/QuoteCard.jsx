import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  color: #ffd700;

  &:hover {
    transform: scale(1.05);
  }
`;

const QuoteText = styled.p`
  font-size: 1.2rem;
  font-style: italic;
`;

const QuoteAuthor = styled.p`
  font-weight: bold;
  color: #ff8c00;
  margin-top: 10px;
`;

const QuoteYear = styled.p`
  font-size: 0.9rem;
  margin-top: 5px;
`;

const QuoteCard = ({ quote }) => {
  return (
    <Card>
      <QuoteText>"{quote.quote}"</QuoteText>
      <QuoteAuthor>- {quote.author}</QuoteAuthor>
      <QuoteYear>{quote.year}</QuoteYear>
    </Card>
  );
};

export default QuoteCard;
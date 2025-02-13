import React, { useState } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
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

const Select = styled.select`
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

const Button = styled.button`
  padding: 10px 20px;
  background: #ffd700;
  color: #0a192f;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: #ff8c00;
  }
`;

const QuoteFilter = ({ onFilter, onSort }) => {
  const [authorFilter, setAuthorFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const handleFilter = () => {
    onFilter({ author: authorFilter, year: yearFilter });
  };

  const handleSort = (e) => {
    onSort(e.target.value);
  };

  return (
    <FilterContainer>
      <Input
        type="text"
        placeholder="Filter by Author"
        value={authorFilter}
        onChange={(e) => setAuthorFilter(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Filter by Year"
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
      />
      <Button onClick={handleFilter}>Apply Filters</Button>
      <Select onChange={handleSort}>
        <option value="">Sort by Year</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
    </FilterContainer>
  );
};

export default QuoteFilter;
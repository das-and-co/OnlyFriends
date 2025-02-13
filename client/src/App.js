import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Add this import
import Header from './components/Header';
import ViewQuotesPage from './pages/ViewQuotesPage';
import AddQuotePage from './pages/AddQuotePage';

const Container = styled.div`
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  padding: 20px;
  background-color: #0a192f;
  min-height: 100vh;
  color: #ffd700;
`;

const App = () => {
  const [activeTab, setActiveTab] = useState('view');

  const handleAddQuote = async (newQuote) => {
    try {
      await axios.post('http://localhost:5000/api/quotes', newQuote); // Use axios directly
      // No need to manage `quotes` state here; the ViewQuotesPage will refetch quotes
    } catch (err) {
      console.error('Error adding quote:', err);
    }
  };

  return (
    <Container>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'view' ? <ViewQuotesPage /> : <AddQuotePage onAddQuote={handleAddQuote} />}
    </Container>
  );
};

export default App;
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 20px;
  background-color: #0a192f;
  color: #ffd700;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background: ${({ active }) => (active ? '#ffd700' : '#0a192f')};
  color: ${({ active }) => (active ? '#0a192f' : '#ffd700')};
  border: 2px solid #ffd700;
  border-radius: 5px;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #ff8c00;
    color: #0a192f;
  }
`;

const Header = ({ activeTab, onTabChange }) => {
  return (
    <HeaderContainer>
      <Title>Das & Co Quotes</Title>
      <Tabs>
        <TabButton active={activeTab === 'view'} onClick={() => onTabChange('view')}>
          View Quotes
        </TabButton>
        <TabButton active={activeTab === 'add'} onClick={() => onTabChange('add')}>
          Add New Quote
        </TabButton>
      </Tabs>
    </HeaderContainer>
  );
};

export default Header;
import * as React from 'react';
import styled from 'styled-components';

import Hero from '@/components/Hero';
import Button from '@/components/Button';

const Main = styled.main`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 50px 100px;
`;

const MainContainer = styled.div`
  position: relative;
  width: 100%;
`;

const MainWrapper = styled.div`
  top: -230px;
  position: absolute;
  background-color: white;
  border-radius: 6px;
  padding: 32px;
  width: 100%;
`;

const MainContent = styled.div`
  display: grid;
  grid-row: column;
  gap: 1rem;
`;

const App = () => {
  return (
    <>
      <Hero />
      <Main>
        <MainContainer>
          <MainWrapper>
            <MainContent>
              <h3>Test</h3>
              <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
              </ul>
              <Button></Button>
            </MainContent>
          </MainWrapper>
        </MainContainer>
      </Main>
    </>
  );
};

export default App;

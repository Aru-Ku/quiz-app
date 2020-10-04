import React, { useState, useCallback } from 'react';
import Navbar from '../common/_navbar';
import styled from 'styled-components';
import Topics from './topics';
import Questions from './questions';

export default () => {
  const [selectedID, setSelectedId] = useState('');
  const setId = useCallback(
    id => {
      setSelectedId(id);
    },
    [setSelectedId]
  );
  return (
    <Wrapper>
      <Navbar />
      <div className="container">
        <div className="grid">
          <Topics clsName="topics" selectId={setId} />
          <Questions clsName="questions" topicId={selectedID} />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  > .container {
    padding-top: 50px;
    width: 70%;
    height: 100%;
    margin: 0 auto;
    transition: width 0.4s ease;
  }
  & .grid {
    margin-top: 10px;
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    border-radius: 5px;
    box-shadow: 0px 0px 9px 0 black;
    padding: 5px;
  }
  & .topics,
  & .questions {
    height: 100%;
    h3 {
      background: white;
      position: sticky;
      box-shadow: 0px 1px 6px 0px var(--font);
      top: 0;
      left: 0;
      padding: 3px;
      margin: 0;
    }
  }
  & .topics {
    max-width: 250px;
    width: 100%;
    overflow-y: scroll;
    border-right: none;
    background-color: #e6e6e6;
    transition: width 0.4s ease;
  }
  & .questions {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    border-left: none;
    position: relative;
  }
  @media (max-width: 768px) {
    > .container {
      width: 92%;
    }
    & .topics {
      max-width: 190px;
    }
  }
`;

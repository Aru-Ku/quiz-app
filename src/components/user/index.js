import React from 'react';
import styled from 'styled-components';

import { useAuth } from '../../utils/auth';
import Dashboard from './components/_dashboard';
import SelectTopic from './components/_selectTopic';

export default () => {
  const userDetails = useAuth().getDetails();

  const top_bar = (
    <Topbar>
      <h1>Hello {userDetails.displayName}, &nbsp;</h1>
      <img src={userDetails.photoURL} alt="User Pic" />
    </Topbar>
  );

  return (
    <Wrapper>
      <div className="container">
        {top_bar}
        <Dashboard uid={userDetails.uid} />
        <SelectTopic uid={userDetails.uid} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  > .container {
    padding-top: 60px;
    width: 70%;
    margin: 0 auto;
  }
`;

const Topbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 25px;
    border: 2px solid #11ea11;
  }
`;

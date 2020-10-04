import React, { useState } from 'react';
import styled from 'styled-components';

import Loading from './_loading';
import Quiz from './_quiz';

export default ({ location: { state } }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Wrapper>
      <div className="container">
        <Loading loading={loading} />
        <Quiz state={state} show={() => setLoading(false)} loading={loading} />
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

import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: #88888887;
  position: absolute;
  z-index: 500;
`;

export default ({ handler = () => {} }) => <Box onClick={handler} />;

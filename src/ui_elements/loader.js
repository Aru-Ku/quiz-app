import styled, { keyframes } from 'styled-components';
import React from 'react';

const animate = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  margin: 0 auto;
  position: relative;
  text-indent: -9999em;
  border-top: 5px solid rgba(0, 0, 0, 0.2);
  border-right: 5px solid rgba(0, 0, 0, 0.2);
  border-bottom: 5px solid rgba(0, 0, 0, 0.2);
  border-left: 5px solid #000000;
  transform: translateZ(0);
  animation: ${animate} 1.1s infinite linear;
  &,
  &:after {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

export default ({ size = 50 }) => (
  <div style={{ width: `${size}px`, height: `${size}px`, margin: '0 auto' }}>
    <Loader />
  </div>
);

import * as React from 'react';
import styled, { keyframes } from 'styled-components';

export default ({ children }) => {
  return (
    <WavesWrapper>
      <div className="content">
        {children}
        <SVG viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
          </defs>
          <g className="animate">
            <use xlinkHref="#wave" x={48} fill="rgba(29, 83, 219,0.7)" />
            <use xlinkHref="#wave" x={48} y={3} fill="rgba(29, 83, 219,0.5)" />
            <use xlinkHref="#wave" x={48} y={5} fill="rgba(29, 83, 219,0.3)" />
            <use xlinkHref="#wave" x={48} y={7} fill="rgba(52, 107, 247)" />
          </g>
        </SVG>
      </div>
    </WavesWrapper>
  );
};

const WavesWrapper = styled.div`
  margin: 0;
  padding: 0;
  padding-top: 50px;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    /* background: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%); */
  }
`;

const animateWaves = keyframes`
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
`;

const SVG = styled.svg`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 15vh;
  min-height: 100px;
  max-height: 150px;
  margin: 0;
  padding: 0;
  .animate > use {
    animation: ${animateWaves} 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
    ${() => {
      [1, 2, 3, 4].map(
        item => `&:nth-child(${item}) {
        animation-delay: -${item * 2}s;
        animation-duration: ${4 * item + 2}
      }`
      );
    }}
  }
`;

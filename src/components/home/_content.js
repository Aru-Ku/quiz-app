import React from 'react';
import styled from 'styled-components';

export default () => {
  return (
    <Wrapper>
      <div className="flex">
        <div className="content">
          <h1>Squeeze the Quizzes ...</h1>
          <p>Play amazing & compete with yourself</p>
        </div>
        <div className="image">
          <img src="https://dev.quizando.com/dynimage/homebannerover/13597/image.png" alt="Quiz" />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  padding: 8% 12%;
  .flex {
    height: 100%;
    width: 100%;
    display: flex;
    transition: all 0.45s ease;
  }
  .content {
    margin: auto;
    h1 {
      margin: 0;
      font-weight: 600;
      font-size: 2.5rem;
      transition: all 0.45s ease;
    }
    p {
      margin: 0;
      font-size: 1.2rem;
      transition: all 0.45s ease;
    }
  }
  .image img {
    width: 100%;
  }
  @media (max-width: 768px) {
    .flex {
      flex-direction: column;
    }
    .content {
      h1 {
        font-size: 1.85rem;
      }
      p {
        font-size: 1.1rem;
      }
    }
    .image {
      text-align: center;
    }
    .image img {
      padding-top: 80px;
      width: 60%;
    }
  }
`;

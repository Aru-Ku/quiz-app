import React from 'react';
import styled from 'styled-components';

export default ({ question, options }) => {
  console.log();
  return (
    <Li>
      <p>{question}</p>
      <Label>
        <input type="radio" name={question} value="A" required /> A : {options['A']}
      </Label>
      <Label>
        <input type="radio" name={question} value="B" required /> B : {options['B']}
      </Label>
      <Label>
        <input type="radio" name={question} value="C" required /> C : {options['C']}
      </Label>
      <Label>
        <input type="radio" name={question} value="D" required /> D : {options['D']}
      </Label>
    </Li>
  );
};

const Li = styled.li`
  > p {
    margin: 10px 0 0 0;
  }
`;

const Label = styled.label`
  display: block;
  cursor: pointer;
  margin-bottom: 5px;
`;

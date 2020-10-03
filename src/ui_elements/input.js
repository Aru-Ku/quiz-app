import React from 'react';
import styled from 'styled-components';

export default ({ value = '', update = () => {}, name = '', label = 'label' }) => {
  return (
    <Wrapper value={value}>
      <input type="text" value={value} onChange={update} name={name} />
      <label htmlFor={name}>{label}</label>
      <span></span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 25px 0 5px 0;

  input {
    width: 90%;
    margin: 0 auto;
    padding: 4px 0px;
    display: block;
    border: none;
    border-bottom: 1px solid #757575;
    &:focus {
      outline: none;
    }
    &:focus ~ label {
      top: -20px;
      font-size: 14px;
      color: var(--font);
    }
    &:focus ~ span {
      width: 90%;
    }
  }
  span {
    width: 0%;
    display: block;
    background: var(--font);
    height: 3px;
    margin: 0 auto;
    transition: width 0.5s ease;
  }
  label {
    color: var(--font);
    position: absolute;
    pointer-events: none;
    left: 5%;
    top: 0px;
    transition: 0.2s ease all;
    ${props => (props.value !== '' ? `top: -20px; font-size: 14px;` : ``)}
  }
`;

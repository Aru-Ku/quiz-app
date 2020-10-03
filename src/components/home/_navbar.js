import React from 'react';
import styled from 'styled-components';
import { FcReading } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import LoginModel from './_login';

export default function Navbar() {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <LoginModel open={open} close={handleClose} />
      <div className="container">
        <Link className="logo" to="/">
          Let's Quiz it <FcReading className="icon" />
        </Link>
        <button className="login" onClick={handleOpen}>
          LOGIN
        </button>
      </div>
    </Wrapper>
  );
}

export const Wrapper = styled.nav`
  width: 100%;
  height: 50px;
  background-color: var(--bg);
  color: var(--font);

  .container {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    color: var(--font);
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 600;
    .icon {
      width: 1.2rem;
      height: 1.2rem;
      font-size: 1.4rem;
    }
  }

  .login {
    color: var(--font);
    background-color: var(--bg);
    outline: none;
    border: none;
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

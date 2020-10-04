import React, { useState } from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { IoMdCloseCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import Backdrop from '../../ui_elements/backdrop';
import Input from '../../ui_elements/input';
import { googleUserLogin, adminUserLogin } from '../../utils/firebase';
import { useAuth } from '../../utils/auth';
import Loader from '../../ui_elements/loader';

export default function LoginModal({ open, close }) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState({
    email: '',
    pwd: '',
    code: '',
  });

  const updateAdminHandler = ({ target: { name, value } }) => {
    setAdmin(prevState => {
      prevState[name] = value;
      return { ...prevState };
    });
  };

  const openTabContent = id => {
    const model = document.getElementById('login__model');
    const tabContent = model.getElementsByClassName('tabContent');
    const tabs = model.getElementsByClassName('button');
    const user = model.querySelectorAll(`#${id}`);
    Array.from(tabContent).forEach(tc => tc.classList.remove('active'));
    Array.from(tabs).forEach(tc => tc.classList.remove('active'));
    Array.from(user).forEach(tc => tc.classList.add('active'));
  };

  const userLogin = async () => {
    setLoading(true);
    const data = await googleUserLogin();

    if (data === 'failed') {
      toast.error('🙅🏻‍♂️ Login Failed');
      setLoading(false);
      return;
    } else {
      await auth.loginUser({
        type: 'user',
        data: { ...data },
      });
      setLoading(false);
    }
  };

  const adminLogin = async e => {
    const { email, pwd, code } = admin;
    if (/\S+@\S+\.\S+/.test(email) && pwd !== '') {
      e.preventDefault();
      setLoading(true);
      if (code === 'act') {
        const data = await adminUserLogin(admin.email, admin.pwd);
        if (data === 'User not found') {
          toast.error('🧔🏻 User not Found');
          setLoading(false);
          return;
        } else {
          await auth.loginUser({
            type: 'admin',
            data: { ...data },
          });
          setLoading(false);
        }
      } else {
        toast.error('🤔 Wrong Pass Code');
        setLoading(false);
      }
    }
  };

  return (
    <Wrapper className={`${open ? `show` : ``}`}>
      <Backdrop handler={close} />
      <div className="model" id="login__model">
        <IoMdCloseCircle className="icon" onClick={close} />
        <h3>Login</h3>
        <div className="tabs">
          {['User', 'Admin'].map((item, index) => (
            <div className={`button ${index === 0 ? `active` : ``}`} key={item} id={item}>
              <button onClick={() => openTabContent(item)}>{item}</button>
            </div>
          ))}
        </div>
        <div className="tabContent active" id="User">
          <button className="googleButton" onClick={userLogin}>
            <FcGoogle /> <span>Signin</span>
          </button>
        </div>
        <div className="tabContent" id="Admin">
          <form>
            <Input type="email" value={admin.email} name="email" update={updateAdminHandler} label="Email ID" />
            <Input type="password" value={admin.pwd} name="pwd" update={updateAdminHandler} label="Password" />
            <Input value={admin.code} name="code" update={updateAdminHandler} label="Pass Code" />
            <button className="adminLogin" onClick={adminLogin}>
              Login
            </button>
          </form>
        </div>
        {loading ? <Loader size={30} /> : null}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 0%;
  z-index: 490;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  &.show {
    height: 100%;
  }
  &.show .model {
    display: initial;
  }
  .model {
    position: relative;
    .icon {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;
    }
    display: none;
    z-index: 510;
    width: 380px;
    height: 350px;
    background-color: var(--bg);
    border-radius: 20px;
    box-shadow: 1px 3px 8px 0px #000000a8;
    > h3 {
      margin: 15px 0;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
  .tabs {
    width: 100%;
    display: flex;
    .button {
      width: 100%;
      background-color: var(--bg);
      &.active {
        border-bottom: 2px solid var(--font);
      }
      > button {
        width: 50%;
        margin-left: 25%;
        color: var(--font);
        background-color: var(--bg);
        outline: none;
        border: none;
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }
  .tabContent {
    width: 100%;
    display: none;
    &.active {
      display: block;
    }
    .googleButton {
      width: 50%;
      height: 30px;
      margin-left: 25%;
      margin-top: 50px;
      background-color: var(--bg);
      border: 1px solid var(--font);
      outline: none;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        color: var(--font);
        font-size: 1.1rem;
      }
      > svg {
        width: 1.5rem;
        height: 1.2rem;
      }
    }
    .adminLogin {
      width: 50%;
      margin-left: 25%;
      background-color: var(--font);
      color: var(--bg);
      border: none;
      font-size: 1rem;
      padding: 5px 0;
      border-radius: 5px;
      box-shadow: 3px 2px 5px #000000de;
    }
  }
`;

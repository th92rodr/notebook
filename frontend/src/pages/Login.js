import React from 'react';
import { useState } from 'react';

import { StyledLoginPage } from './StyledLoginPage';

function LoginPage() {
  const [pageMode, setPageMode] = useState(false);

  const nameElement = React.createRef();
  const emailElement = React.createRef();

  function switchPageMode() {
    setPageMode(prevState => {
      if (prevState === 'login') return 'signup';
      else return 'login';
    });
  }

  function loginHandler(event) {
    event.preventDefault();
    const email = emailElement.current.value;
  }

  function signUpHandler(event) {
    event.preventDefault();
    const email = emailElement.current.value;
    const name = nameElement.current.value;
  }

  const selectSignUp = () => {
    //container.classList.add('right-panel-active');
    setPageMode(true);
    console.log('select sign up');
    console.log(pageMode);
  };
  const selectSignIn = () => {
    //container.classList.remove('right-panel-active');
    setPageMode(false);
    console.log('select sign in');
    console.log(pageMode);
  };

  const signup = (
    <div className='form-container sign-up-container'>
      <form onSubmit={signUpHandler}>
        <h1>Create Account</h1>
        <input type='text' id='name' placeholder='Name' ref={nameElement} />
        <input type='email' id='email' placeholder='Email' ref={emailElement} />
        <input type='password' placeholder='Password' />
        <button>Sign Up</button>
      </form>
    </div>
  );

  const login = (
    <div className='form-container sign-in-container'>
      <form onSubmit={loginHandler}>
        <h1>Sign In</h1>
        <input type='email' id='email' placeholder='Email' ref={emailElement} />
        <input type='password' placeholder='Password' />
        <button>Sign In</button>
      </form>
    </div>
  );

  const overlay = (
    <div className='overlay-container'>
      <div className='overlay'>
        <div className='overlay-panel overlay-left'>
          <h1>Welcome Back</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button className='ghost' id='signIn' onClick={selectSignIn}>
            Sign In
          </button>
        </div>
        <div className='overlay-panel overlay-right'>
          <h1>Hello,Friend</h1>
          <p>Enter your personal details and start journey with us</p>
          <button className='ghost' id='signUp' onClick={selectSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );

  const right = (
    <div className='container right-panel-active' id='container'>
      {signup}
      {login}
      {overlay}
    </div>
  );
  const left = (
    <div className='container' id='container'>
      {signup}
      {login}
      {overlay}
    </div>
  );

  if (pageMode) {
    return <StyledLoginPage>{right}</StyledLoginPage>;
  } else {
    return <StyledLoginPage>{left}</StyledLoginPage>;
  }
}

export default LoginPage;

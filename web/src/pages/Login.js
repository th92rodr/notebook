import React from 'react';
import { useState } from 'react';

import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/SignUp/SignUpForm';

import './LoginPage.scss';

function LoginPage() {
  const [pageMode, setPageMode] = useState(false);

  function switchPageMode() {
    setPageMode(prevState => {
      if (prevState === 'login') return 'signup';
      else return 'login';
    });
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

  return (
    <div id='login-page'>
      <div className='container'>
        {LoginForm}
        {SignupForm}
        {overlay}
      </div>
    </div>
  );
}

export default LoginPage;

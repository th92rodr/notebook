import React from 'react';

import constants from '../../common/constants';
import { sendRequest } from '../../utils/requestAPI';

function Login() {
  const emailElement = React.createRef();
  const passwordElement = React.createRef();

  function loginHandler(event) {
    event.preventDefault();
    const email = emailElement.current.value;
    const password = passwordElement.current.value;

    const requestBody = {
      email,
      password
    };

    sendRequest(requestBody, constants.LOGIN)
      .then(response => {
        console.log(response);
        const { token, tokenExpiration } = response;
      })
      .catch(error => console.log(error));
  }

  return (
    <div className='form-container sign-in-container'>
      <form onSubmit={loginHandler}>
        <h1>Sign In</h1>
        <input id='email' type='email' placeholder='Email' ref={emailElement} />
        <input
          id='password'
          type='password'
          placeholder='Password'
          ref={passwordElement}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default Login;

import React from 'react';

import constants from '../../common/constants';
import { sendRequest } from '../../utils/requestAPI';

function SignUp() {
  const nameElement = React.createRef();
  const emailElement = React.createRef();
  const passwordElement = React.createRef();

  function signUpHandler(event) {
    event.preventDefault();
    const email = emailElement.current.value;
    const name = nameElement.current.value;
    const password = passwordElement.current.value;

    const requestBody = {
      email,
      name,
      password
    };

    sendRequest(requestBody, constants.CREATE_USER)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  return (
    <div className='form-container sign-up-container'>
      <form onSubmit={signUpHandler}>
        <h1>Create Account</h1>
        <input id='name' type='text' placeholder='Name' ref={nameElement} />
        <input id='email' type='email' placeholder='Email' ref={emailElement} />
        <input
          id='password'
          type='password'
          placeholder='Password'
          ref={passwordElement}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

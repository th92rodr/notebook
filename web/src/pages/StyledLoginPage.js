import styled from 'styled-components';

export const StyledLoginPage = styled.div`
  font-family: 'Montserrat', sans-serif;
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url(https://images.unsplash.com/photo-1500993855538-c6a99f437aa7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
  background-size: cover;

  .container {
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    opacity: 0.8;

    .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;

      form {
        background: rgba(45, 52, 54, 1);
        display: flex;
        flex-direction: column;
        padding: 0 50px;
        height: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      input {
        background: #eee;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
      }
    }

    h1 {
      font-weight: bold;
      margin: 0;
      color: beige;
    }

    p {
      font-size: 14px;
      font-weight: bold;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 20px 0 30px;
    }

    span {
      font-size: 12px;
      color: beige;
    }

    button {
      border-radius: 20px;
      border: 1px solid #ff4b2b;
      background: #ff4b2b;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 80ms ease-in;

      &:active {
        transform: scale(0.95);
      }

      &:focus {
        outline: none;
      }

      &.ghost {
        background: transparent;
        border-color: #ff4b2b;
        background-color: #ff4b2b;
      }
    }

    .sign-up-container {
      left: 0;
      width: 50%;
      z-index: 1;
      opacity: 0;
    }

    .sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;
      z-index: 100;

      .overlay {
        background: transparent;
        background: linear-gradient(to right, #ff4b2b, #ff416c) no repeat 0 0 /
          cover;
        color: #fff;
        position: absolute;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
      }

      .overlay-panel {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 40px;
        height: 100%;
        width: 50%;
        text-align: center;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
      }

      .overlay-right {
        right: 0;
        transform: translateX(0);
      }

      .overlay-left {
        transform: translateX(-20%);
      }
    }

    input[type='text'] {
      width: 240px;
      text-align: center;
      background: transparent;
      border: none;
      border-bottom: 1px solid #fff;
      font-family: 'PLay', sans-serif;
      font-size: 16px;
      font-weight: 200px;
      padding: 10px 0;
      transition: border 0.5s;
      outline: none;
      color: #fff;
      font-weight: bold;
    }

    input[type='password'] {
      width: 240px;
      text-align: center;
      background: transparent;
      border: none;
      border-bottom: 1px solid #fff;
      font-family: 'PLay', sans-serif;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 0;
      transition: border 0.5s;
      outline: none;
      color: #fff;
    }

    input[type='email'] {
      width: 240px;
      text-align: center;
      background: transparent;
      border: none;
      border-bottom: 1px solid #fff;
      font-family: 'PLay', sans-serif;
      font-size: 16px;
      font-weight: 200px;
      padding: 10px 0;
      transition: border 0.5s;
      outline: none;
      color: #fff;
      font-weight: bold;
    }
  }

  /*....Move signin to the right....*/
  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  /*....Move overlay to the left....*/
  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  /*....Bring sign up over sign in....*/
  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  }

  /*...Move overlay back to right....*/
  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
`;

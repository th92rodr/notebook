import styled from 'styled-components';

export const StyledLandingPage = styled.div`
  background: #fff;
  font-family: 'Nunito Sans', sans-serif;

  .inner {
    width: 100%;
    height: 100vh;
    background: transparent;
    display: flex;
    text-align: center;
    align-items: center;
    transition: all 0.3s linear;
    z-index: 0;
    border-radius: 3px;
    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.29), 0 0px 6px rgba(0, 0, 0, 0.35);
    background-size: cover;

    .prod-left {
      width: 55%;
      text-align: left;
      padding-left: 75px;

      .prod-head {
        margin-left: -5px !important;
        text-align: left;
        font-weight: 800;
        font-size: 80pt;
        color: #6f7576;
        margin: 0;
      }

      .prod-head-sub {
        font-weight: 400;
        font-size: 25pt;
        color: #6f7576;
        margin: 0 auto;
      }
    }

    .prod-right {
      width: 45%;

      .prod-human-img {
        width: 250px;
        height: 300px;
      }
    }
  }
`;

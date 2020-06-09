import React from 'react';
import { Link } from 'react-router-dom';

import { StyledLandingPage } from './StyledLandingPage';

function LandingPage() {
  return (
    <StyledLandingPage>
      <div class='inner'>
        <div class='prod-left'>
          <h1 class='prod-head'>
            <span>KEEPER OF THE SEVEN KEYS</span>
          </h1>
          <h4 class='prod-head-sub'>
            Keep all your notes in one safe place...
          </h4>
          <Link to='/login'>
            <button>Get in...</button>
          </Link>
        </div>

        <div class='prod-right'>
          <img
            //src="https://github.com/abhinanduN/codepen/blob/master/human-image.png?raw=true"
            //src="/imgs/landing-page.jpg"
            src='/imgs/kingdom-4.png'
            class='prod-human-img'
            alt='prod'
          />
        </div>
      </div>
    </StyledLandingPage>
  );
}

export default LandingPage;

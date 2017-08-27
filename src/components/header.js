import React from 'react';

import ArrowIcon from '../icons/arrow.svg';

const Header = props =>
  <header className="messenger__header">
    <div className="messenger__header__top">
      <div className="messenger__header__back-icon">
        <img src={ArrowIcon} alt="back" />
      </div>
      <h1 className="messenger__header__group-title">Julia's Groupchate</h1>
    </div>
    <small className="messenger__header__bottom">3 People Online</small>
  </header>;

export default Header;

import React from 'react';

const MenuButton = ({ href, text, icon }) => (
  <a href={href} className="custom-button">
    <div className="button-content">
      {icon && <img src={icon} alt={text} className="button-icon" />}
      <span className="button-text">{text}</span>
    </div>
  </a>
);

export default MenuButton;
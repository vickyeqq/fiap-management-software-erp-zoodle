import React from 'react';
import { Link } from 'react-router-dom';
import logoskina from '../assets/img/logo-zoodle.png';

const Header = () => {
  return (
    <header>
      <Link to="/" className="header-link">
        <img src={logoskina} alt="Logo Zoodle Na Caixa" id="logo" />
        <h1>ZOODLE NA CAIXA</h1>
      </Link>
    </header>
  );
};

export default Header;
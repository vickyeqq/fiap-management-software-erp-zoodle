import React from 'react';
import { useLocation } from 'react-router-dom';
import TeamMembers from './TeamMembers';

const Footer = () => {
  const location = useLocation();
  const isMenuPrincipal = location.pathname === '/';

  return (
    <footer>
      {isMenuPrincipal && <TeamMembers />}
      <p className="credits">Built in 2024, powered by FIAP</p>
    </footer>
  );
};

export default Footer;
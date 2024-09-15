import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const MenuLayout = ({ title, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMenuPrincipal = location.pathname === '/';

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <main>
        {!isMenuPrincipal && (
          <div onClick={handleBackClick}>
            <BackButton />
          </div>
        )}
        <h2 className="menu-title">{title}</h2>
        <hr className="menu-divider menu-divider-80" />
        <div className="content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MenuLayout;
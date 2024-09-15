import React from 'react';
import PropTypes from 'prop-types';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, title, showBackButton = true, onBackClick, onUpdate, onDelete }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      <main>
        {showBackButton && <BackButton onClick={handleBackClick} />}
        <h2 className="menu-title">{title}</h2>
        <hr className="menu-divider menu-divider-80" />
        <div className="content">
          {children}
          <div className="form-buttons">
            {onDelete && (
              <button className="cancel-button" onClick={onDelete}>
                Deletar
              </button>
            )}
            {onUpdate && (
              <button className="save-button" onClick={onUpdate}>
                Atualizar
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool,
  onBackClick: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Layout;
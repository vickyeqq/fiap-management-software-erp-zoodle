import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isVisible, onClose, title, content, onConfirm, confirmText = 'Confirmar', cancelText = 'Cancelar' }) => {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        <div className="modal-body">{content}</div>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>{cancelText}</button>
          {onConfirm && <button className="confirm-button" onClick={onConfirm}>{confirmText}</button>}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default Modal;
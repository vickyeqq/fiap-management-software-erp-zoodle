import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ onSubmit, children, onCancel }) => {
  return (
    <form className="all-form" onSubmit={onSubmit}>
      {children}
      <div className="form-buttons">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="save-button">Salvar</button>
      </div>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form;
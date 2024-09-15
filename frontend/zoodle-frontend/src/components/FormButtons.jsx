import React from 'react';

const FormButtons = ({ onCancel, onSave }) => (
  <div className="form-buttons">
    <button type="button" className="cancel-button" onClick={onCancel}>
      Cancelar
    </button>
    <button type="submit" className="save-button" onClick={onSave}>
      Salvar
    </button>
  </div>
);

export default FormButtons;
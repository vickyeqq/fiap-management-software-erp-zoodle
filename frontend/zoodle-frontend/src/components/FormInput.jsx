// src/components/FormInput.jsx
import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ label, id, name, type = 'text', value, onChange, required = false }) => (
  <>
    <label htmlFor={id}>{label} {required && '*'}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default FormInput;
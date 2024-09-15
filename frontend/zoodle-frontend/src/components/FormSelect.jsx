import React from 'react';

const FormSelect = ({ label, id, name, value, onChange, options, required }) => (
  <>
    <label htmlFor={id}>{label} {required && '*'}</label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    >
      <option value="">Selecione</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </>
);

export default FormSelect;
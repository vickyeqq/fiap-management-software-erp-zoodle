import React from 'react';
import backArrow from '../assets/img/back-arrow.png';

const BackButton = ({ onClick }) => (
  <div className="back-button" onClick={onClick}>
    <img src={backArrow} alt="Voltar" />
  </div>
);

export default BackButton;
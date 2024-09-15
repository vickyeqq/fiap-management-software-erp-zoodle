import React from 'react';

const MenuItem = ({ item, onItemClick, onDelete, IconComponent }) => (
  <div className="item">
    <div className="item-content" onClick={() => onItemClick(item.id)}>
      {IconComponent && <IconComponent />}
      <span className="item-name">{item.nome}</span>
    </div>
    <button
      className="delete-button"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(item);
      }}
    >
      Deletar
    </button>
  </div>
);

export default MenuItem;
import React from 'react';
import MenuItem from './MenuItem';

const MenuList = ({ items, onDelete, onItemClick, IconComponent }) => (
  <div className="list">
    {items.map((item) => (
      <MenuItem
        key={item.id}
        item={item}
        onDelete={onDelete}
        onItemClick={onItemClick}
        IconComponent={IconComponent}
      />
    ))}
  </div>
);

export default MenuList;
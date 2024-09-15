import React from 'react';
import MenuLayout from '../components/MenuLayout';
import MenuButton from '../components/MenuButton';

import productIcon from '../assets/img/product-icon-white.png';
import deliveryIcon from '../assets/img/delivery-icon-white.png';
import supplierIcon from '../assets/img/supplier-icon-white.png';
import userIcon from '../assets/img/user-white.png';

const MenuPrincipal = () => {
  const menuItems = [
    { href: "/menu-produto", text: "PRODUTO", icon: productIcon },
    { href: "/menu-pedido", text: "PEDIDO", icon: deliveryIcon },
    { href: "/menu-fornecedor", text: "FORNECEDOR", icon: supplierIcon },
    { href: "/menu-usuario", text: "USUÁRIO", icon: userIcon },
  ];

  return (
    <MenuLayout title="MENU PRINCIPAL">
      <div className="menu-buttons-horizontal">
        {menuItems.map((item, index) => (
          <MenuButton 
            key={index} 
            href={item.href} 
            text={item.text} 
            icon={item.icon}
          />
        ))}
      </div>
    </MenuLayout>
  );
};

export default MenuPrincipal;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import MenuLayout from '../components/MenuLayout';
import MenuList from '../components/MenuList';
import Modal from '../components/Modal';
import productIcon from '../assets/img/product-icon.png';

const MenuProduto = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();

  const handleProductClick = (productId) => {
    navigate(`/detalhe-produto/${productId}`);
  };

  const handleDelete = (produto) => {
    setSelectedProduto(produto);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduto) {
      deleteProduct(selectedProduto.id);
      setModalVisible(false);
    }
  };

  return (
    <MenuLayout title="PRODUTOS">
      <a href="/adicionar-produto" className="add-button">Adicionar</a>
      <MenuList
        items={products}
        onItemClick={handleProductClick}
        onDelete={handleDelete}
        IconComponent={() => <img src={productIcon} alt="Produto" />}
      />
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="DELETAR PRODUTO"
        content={
          selectedProduto && (
            <>
              <p>Você está prestes a <span className="delete-text">deletar</span> o produto "<span id="product-name">{selectedProduto.nome}</span>" do sistema. Esta ação é irreversível.</p>
              <p>Tem certeza que deseja proceder com a exclusão?</p>
            </>
          )
        }
        onConfirm={handleConfirmDelete}
      />
    </MenuLayout>
  );
};

export default MenuProduto;
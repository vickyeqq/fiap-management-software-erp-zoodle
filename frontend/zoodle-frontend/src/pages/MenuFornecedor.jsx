import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuppliers } from '../contexts/SupplierContext';
import MenuLayout from '../components/MenuLayout';
import MenuList from '../components/MenuList';
import Modal from '../components/Modal';
import supplierIcon from '../assets/img/supplier-icon.png';

const MenuFornecedor = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const navigate = useNavigate();
  const { suppliers, deleteSupplier } = useSuppliers();

  const handleSupplierClick = (supplierId) => {
    navigate(`/detalhe-fornecedor/${supplierId}`);
  };

  const handleDelete = (supplier) => {
    setSelectedSupplier(supplier);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSupplier) {
      deleteSupplier(selectedSupplier.id);
      setModalVisible(false);
    }
  };

  return (
    <MenuLayout title="FORNECEDORES">
      <a href="/adicionar-fornecedor" className="add-button">Adicionar</a>
      <MenuList
        items={suppliers}
        onItemClick={handleSupplierClick}
        onDelete={handleDelete}
        IconComponent={() => <img src={supplierIcon} alt="Fornecedor" />}
      />
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="DELETAR FORNECEDOR"
        content={
          selectedSupplier && (
            <>
              <p>Você está prestes a <span className="delete-text">deletar</span> o fornecedor "<span id="supplier-name">{selectedSupplier.nome}</span>" do sistema. Esta ação é irreversível.</p>
              <p>Tem certeza que deseja proceder com a exclusão?</p>
            </>
          )
        }
        onConfirm={handleConfirmDelete}
      />
    </MenuLayout>
  );
};

export default MenuFornecedor;
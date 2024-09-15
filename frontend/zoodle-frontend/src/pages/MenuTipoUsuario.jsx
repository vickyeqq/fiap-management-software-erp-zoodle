import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserTypes } from '../contexts/UserTypeContext';
import MenuLayout from '../components/MenuLayout';
import MenuList from '../components/MenuList';
import Modal from '../components/Modal';

const MenuTipoUsuario = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const navigate = useNavigate();
  const { userTypes, deleteUserType } = useUserTypes();

  const handleUserTypeClick = (userTypeId) => {
    navigate(`/adicionar-tipo-usuario/${userTypeId}`);
  };

  const handleDelete = (userType) => {
    setSelectedUserType(userType);
    setModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserType) {
      try {
        await deleteUserType(selectedUserType.id);
        setModalVisible(false);
      } catch (error) {
        console.error('Erro ao deletar tipo de usuário:', error);
      }
    }
  };

  const handleAddUserType = () => {
    navigate('/adicionar-tipo-usuario');
  };

  return (
    <MenuLayout title="TIPOS DE USUÁRIO">
      <a href="#" onClick={handleAddUserType} className="add-button">Adicionar Tipo de Usuário</a>
      <MenuList
        items={userTypes}
        onItemClick={handleUserTypeClick}
        onDelete={handleDelete}
      />
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="DELETAR TIPO DE USUÁRIO"
        content={
          selectedUserType && (
            <>
              <p>Você está prestes a <span className="delete-text">deletar</span> o tipo de usuário "<span id="user-type-name">{selectedUserType.nome}</span>" do sistema. Esta ação é irreversível.</p>
              <p>Tem certeza que deseja proceder com a exclusão?</p>
            </>
          )
        }
        onConfirm={handleConfirmDelete}
      />
    </MenuLayout>
  );
};

export default MenuTipoUsuario;
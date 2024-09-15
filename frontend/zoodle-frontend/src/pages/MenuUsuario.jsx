import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext';
import MenuLayout from '../components/MenuLayout';
import MenuList from '../components/MenuList';
import Modal from '../components/Modal';
import userIcon from '../assets/img/user.png';

const MenuUsuario = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const navigate = useNavigate();
  const { users, deleteUser } = useUsers();

  const handleUserClick = (userId) => {
    navigate(`/detalhe-usuario/${userId}`);
  };

  const handleDelete = (usuario) => {
    setSelectedUsuario(usuario);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUsuario) {
      deleteUser(selectedUsuario.id);
      setModalVisible(false);
    }
  };

  return (
    <MenuLayout title="USUÁRIOS">
      <a href="/adicionar-usuario" className="add-button">Adicionar Usuário</a>
      <MenuList
        items={users}
        onItemClick={handleUserClick}
        onDelete={handleDelete}
        IconComponent={() => <img src={userIcon} alt="Usuário" />}
      />
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="DELETAR USUÁRIO"
        content={
          selectedUsuario && (
            <>
              <p>Você está prestes a <span className="delete-text">deletar</span> o usuário "<span id="user-name">{selectedUsuario.nome}</span>" do sistema. Esta ação é irreversível.</p>
              <p>Tem certeza que deseja proceder com a exclusão?</p>
            </>
          )
        }
        onConfirm={handleConfirmDelete}
      />
    </MenuLayout>
  );
};

export default MenuUsuario;
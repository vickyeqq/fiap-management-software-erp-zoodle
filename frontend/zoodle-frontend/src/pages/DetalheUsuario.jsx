import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import Modal from '../components/Modal';

const DetalheUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, deleteUser } = useUsers();

  useEffect(() => {
    const userToShow = users.find(u => u.id === parseInt(id));
    if (userToShow) {
      setUsuario(userToShow);
    } else {
      navigate('/menu-usuario');
    }
  }, [id, users, navigate]);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleUpdate = () => {
    navigate(`/adicionar-usuario/${id}`);
  };

  const handleConfirmarExclusao = async () => {
    try {
      await deleteUser(parseInt(id));
      setModalVisible(false);
      navigate('/menu-usuario');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  if (!usuario) {
    return <Layout title="Carregando..."><p>Carregando detalhes do usuário...</p></Layout>;
  }

  return (
    <Layout title="USUÁRIO">
      <div className="content">
        <form className="all-form">
          <FormInput
            label="ID"
            id="id"
            name="id"
            value={usuario.id.toString()}
            readOnly
          />
          <FormInput
            label="Nome"
            id="nome"
            name="nome"
            value={usuario.nome}
            readOnly
          />
          <FormInput
            label="Tipo de Usuário"
            id="tipoUsuario"
            name="tipoUsuario"
            value={usuario.tipoUsuario.toString()}
            readOnly
          />
        </form>
        <div className="button-container">
          <button type="button" className="delete-button" onClick={handleDelete}>Deletar</button>
          <button type="button" className="update-button" onClick={handleUpdate}>Atualizar</button>
        </div>
      </div>
      
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="DELETAR USUÁRIO"
        content={
          <>
            <p>Você está prestes a <span className="delete-text">deletar</span> o usuário "<span id="user-name">{usuario.nome}</span>" do sistema. Esta ação é irreversível.</p>
            <p>Detalhes do Usuário:</p>
            <ul>
              <li>ID: <span id="user-detail-id">{usuario.id}</span></li>
              <li>Nome: <span id="user-detail-name">{usuario.nome}</span></li>
              <li>Tipo de Usuário: <span id="user-detail-type">{usuario.tipoUsuario}</span></li>
            </ul>
            <p>Tem certeza que deseja proceder com a exclusão?</p>
          </>
        }
        onConfirm={handleConfirmarExclusao}
      />
    </Layout>
  );
};

export default DetalheUsuario;
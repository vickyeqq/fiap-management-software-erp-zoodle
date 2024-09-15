import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext';
import { useUserTypes } from '../contexts/UserTypeContext';
import Layout from '../components/Layout';
import Form from '../components/Form';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';

const AdicionarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { users, addUser, updateUser } = useUsers();
  const { userTypes } = useUserTypes();
  const [usuario, setUsuario] = useState({
    id: '',
    nome: '',
    tipoUsuario: ''
  });

  useEffect(() => {
    if (id) {
      const userToEdit = users.find(u => u.id === parseInt(id));
      if (userToEdit) {
        setUsuario({
          id: userToEdit.id.toString(),
          nome: userToEdit.nome,
          tipoUsuario: userToEdit.tipoUsuario.toString()
        });
      }
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioToSave = {
      ...usuario,
      id: parseInt(usuario.id),
      tipoUsuario: parseInt(usuario.tipoUsuario)
    };
    try {
      if (id) {
        await updateUser(usuarioToSave);
      } else {
        await addUser(usuarioToSave);
      }
      navigate('/menu-usuario');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  const handleCancel = () => {
    navigate('/menu-usuario');
  };

  const handleManageUserTypes = () => {
    navigate('/menu-tipo-usuario');
  };

  const tipoOptions = userTypes.map(type => ({
    value: type.id.toString(),
    label: type.nome
  }));

  return (
    <Layout title={id ? "EDITAR USUÁRIO" : "ADICIONAR USUÁRIO"}>
      <div className="action-buttons">
        <a href="/menu-tipo-usuario" className="other-button">Gerenciar Tipos de Usuário</a>
      </div>
      <Form onSubmit={handleSubmit} onCancel={handleCancel}>
        <FormInput
          label="ID"
          id="id"
          name="id"
          type="number"
          value={usuario.id}
          onChange={handleChange}
          required
          disabled={!!id}
        />
        <FormInput
          label="Nome"
          id="nome"
          name="nome"
          type="text"
          value={usuario.nome}
          onChange={handleChange}
          required
        />
        <FormSelect
          label="Tipo de Usuário"
          id="tipoUsuario"
          name="tipoUsuario"
          value={usuario.tipoUsuario}
          onChange={handleChange}
          options={tipoOptions}
          required
        />
      </Form>
    </Layout>
  );
};

export default AdicionarUsuario;
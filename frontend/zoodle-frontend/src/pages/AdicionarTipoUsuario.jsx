import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserTypes } from '../contexts/UserTypeContext';
import Layout from '../components/Layout';
import Form from '../components/Form';
import FormInput from '../components/FormInput';

const AdicionarTipoUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userTypes, addUserType, updateUserType } = useUserTypes();
  const [userType, setUserType] = useState({ id: '', nome: '' });

  useEffect(() => {
    if (id) {
      const userTypeToEdit = userTypes.find(ut => ut.id === parseInt(id));
      if (userTypeToEdit) {
        setUserType({
          id: userTypeToEdit.id.toString(),
          nome: userTypeToEdit.nome
        });
      }
    }
  }, [id, userTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserType(prevUserType => ({
      ...prevUserType,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userTypeToSave = {
      ...userType,
      id: parseInt(userType.id)
    };
    try {
      if (id) {
        await updateUserType(userTypeToSave);
      } else {
        await addUserType(userTypeToSave);
      }
      navigate('/menu-tipo-usuario');
    } catch (error) {
      console.error('Erro ao salvar tipo de usuário:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  const handleCancel = () => {
    navigate('/menu-tipo-usuario');
  };

  return (
    <Layout title={id ? "EDITAR TIPO DE USUÁRIO" : "ADICIONAR TIPO DE USUÁRIO"}>
      <Form onSubmit={handleSubmit} onCancel={handleCancel}>
        <FormInput
          label="ID"
          id="id"
          name="id"
          type="number"
          value={userType.id}
          onChange={handleChange}
          required
          disabled={!!id}
        />
        <FormInput
          label="Nome"
          id="nome"
          name="nome"
          type="text"
          value={userType.nome}
          onChange={handleChange}
          required
        />
      </Form>
    </Layout>
  );
};

export default AdicionarTipoUsuario;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSuppliers } from '../contexts/SupplierContext';
import Layout from '../components/Layout';
import Form from '../components/Form';
import FormInput from '../components/FormInput';

const AdicionarFornecedor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { suppliers, addSupplier, updateSupplier } = useSuppliers();
  const [fornecedor, setFornecedor] = useState({
    id: '',
    nome: '',
    endereco: '',
    telefone: ''
  });

  useEffect(() => {
    if (id) {
      const supplierToEdit = suppliers.find(s => s.id === parseInt(id));
      if (supplierToEdit) {
        setFornecedor({
          id: supplierToEdit.id.toString(),
          nome: supplierToEdit.nome,
          endereco: supplierToEdit.endereco,
          telefone: supplierToEdit.telefone
        });
      }
    }
  }, [id, suppliers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor(prevFornecedor => ({
      ...prevFornecedor,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fornecedorToSave = {
      ...fornecedor,
      id: parseInt(fornecedor.id)
    };
    try {
      if (id) {
        await updateSupplier(fornecedorToSave);
      } else {
        await addSupplier(fornecedorToSave);
      }
      navigate('/menu-fornecedor');
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  const handleCancel = () => {
    navigate('/menu-fornecedor');
  };

  return (
    <Layout title={id ? "EDITAR FORNECEDOR" : "ADICIONAR FORNECEDOR"}>
      <Form onSubmit={handleSubmit} onCancel={handleCancel}>
        <FormInput
          label="ID"
          id="id"
          name="id"
          type="number"
          value={fornecedor.id}
          onChange={handleChange}
          required
          disabled={!!id}
        />
        <FormInput
          label="Nome"
          id="nome"
          name="nome"
          type="text"
          value={fornecedor.nome}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Endereço"
          id="endereco"
          name="endereco"
          type="text"
          value={fornecedor.endereco}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Telefone"
          id="telefone"
          name="telefone"
          type="tel"
          value={fornecedor.telefone}
          onChange={handleChange}
          required
        />
      </Form>
    </Layout>
  );
};

export default AdicionarFornecedor;
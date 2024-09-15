import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSuppliers } from '../contexts/SupplierContext';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import Modal from '../components/Modal';

const DetalheFornecedor = () => {
  const [fornecedor, setFornecedor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { suppliers, deleteSupplier } = useSuppliers();

  useEffect(() => {
    const supplierToShow = suppliers.find(s => s.id === parseInt(id));
    if (supplierToShow) {
      setFornecedor(supplierToShow);
    } else {
      navigate('/menu-fornecedor');
    }
  }, [id, suppliers, navigate]);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleUpdate = () => {
    navigate(`/adicionar-fornecedor/${id}`);
  };

  const handleConfirmarExclusao = async () => {
    try {
      await deleteSupplier(parseInt(id));
      setModalVisible(false);
      navigate('/menu-fornecedor');
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  if (!fornecedor) {
    return <Layout title="Carregando..."><p>Carregando detalhes do fornecedor...</p></Layout>;
  }

  return (
    <Layout title="FORNECEDOR">
      <div className="content">
        <form className="all-form">
          <FormInput
            label="ID"
            id="id"
            name="id"
            value={fornecedor.id.toString()}
            readOnly
          />
          <FormInput
            label="Nome"
            id="nome"
            name="nome"
            value={fornecedor.nome}
            readOnly
          />
          <FormInput
            label="Endereço"
            id="endereco"
            name="endereco"
            value={fornecedor.endereco}
            readOnly
          />
          <FormInput
            label="Telefone"
            id="telefone"
            name="telefone"
            value={fornecedor.telefone}
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
        title="DELETAR FORNECEDOR"
        content={
          <>
            <p>Você está prestes a <span className="delete-text">deletar</span> o fornecedor "<span id="supplier-name">{fornecedor.nome}</span>" do sistema. Esta ação é irreversível.</p>
            <p>Detalhes do Fornecedor:</p>
            <ul>
              <li>ID: <span id="supplier-detail-id">{fornecedor.id}</span></li>
              <li>Nome: <span id="supplier-detail-name">{fornecedor.nome}</span></li>
              <li>Endereço: <span id="supplier-detail-address">{fornecedor.endereco}</span></li>
              <li>Telefone: <span id="supplier-detail-phone">{fornecedor.telefone}</span></li>
            </ul>
            <p>Tem certeza que deseja proceder com a exclusão?</p>
          </>
        }
        onConfirm={handleConfirmarExclusao}
      />
    </Layout>
  );
};

export default DetalheFornecedor;
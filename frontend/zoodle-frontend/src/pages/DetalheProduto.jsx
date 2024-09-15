import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import Modal from '../components/Modal';

const DetalheProduto = () => {
  const [produto, setProduto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();

  useEffect(() => {
    const productToShow = products.find(p => p.id === parseInt(id));
    if (productToShow) {
      setProduto(productToShow);
    } else {
      navigate('/menu-produto');
    }
  }, [id, products, navigate]);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleUpdate = () => {
    navigate(`/adicionar-produto/${id}`);
  };

  const handleConfirmarExclusao = async () => {
    try {
      await deleteProduct(parseInt(id));
      setModalVisible(false);
      navigate('/menu-produto');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  if (!produto) {
    return <Layout title="Carregando..."><p>Carregando detalhes do produto...</p></Layout>;
  }

  return (
    <Layout title="PRODUTO">
      <div className="content">
        <form className="all-form">
          <FormInput
            label="ID"
            id="id"
            name="id"
            value={produto.id.toString()}
            readOnly
          />
          <FormInput
            label="Nome"
            id="nome"
            name="nome"
            value={produto.nome}
            readOnly
          />
          <FormInput
            label="Tipo"
            id="tipo"
            name="tipo"
            value={produto.tipo}
            readOnly
          />
          <FormInput
            label="Quantidade"
            id="quantidade"
            name="quantidade"
            value={produto.quantidade.toString()}
            readOnly
          />
          <FormInput
            label="Preço"
            id="preco"
            name="preco"
            value={produto.preco.toString()}
            readOnly
          />
          <FormInput
            label="ID do Fornecedor"
            id="idFornecedor"
            name="idFornecedor"
            value={produto.idFornecedor.toString()}
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
        title="DELETAR PRODUTO"
        content={
          <>
            <p>Você está prestes a <span className="delete-text">deletar</span> o produto "<span id="product-name">{produto.nome}</span>" do sistema. Esta ação é irreversível.</p>
            <p>Detalhes do Produto:</p>
            <ul>
              <li>ID: <span id="product-detail-id">{produto.id}</span></li>
              <li>Nome: <span id="product-detail-name">{produto.nome}</span></li>
              <li>Tipo: <span id="product-detail-type">{produto.tipo}</span></li>
              <li>Quantidade: <span id="product-detail-quantity">{produto.quantidade}</span></li>
              <li>Preço: <span id="product-detail-price">{produto.preco}</span></li>
              <li>ID do Fornecedor: <span id="product-detail-supplier">{produto.idFornecedor}</span></li>
            </ul>
            <p>Tem certeza que deseja proceder com a exclusão?</p>
          </>
        }
        onConfirm={handleConfirmarExclusao}
      />
    </Layout>
  );
};

export default DetalheProduto;
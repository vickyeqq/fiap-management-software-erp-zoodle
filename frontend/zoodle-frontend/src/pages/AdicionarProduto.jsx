import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import Layout from '../components/Layout';
import Form from '../components/Form';
import FormInput from '../components/FormInput';

const AdicionarProduto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addProduct, updateProduct } = useProducts();
  const [produto, setProduto] = useState({
    id: '',
    nome: '',
    tipo: '',
    quantidade: '',
    preco: '',
    idFornecedor: ''
  });

  useEffect(() => {
    if (id) {
      const productToEdit = products.find(p => p.id === parseInt(id));
      if (productToEdit) {
        setProduto({
          id: productToEdit.id.toString(),
          nome: productToEdit.nome,
          tipo: productToEdit.tipo,
          quantidade: productToEdit.quantidade.toString(),
          preco: productToEdit.preco.toString(),
          idFornecedor: productToEdit.idFornecedor.toString()
        });
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prevProduto => ({
      ...prevProduto,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const produtoToSave = {
      ...produto,
      id: parseInt(produto.id),
      quantidade: parseInt(produto.quantidade),
      preco: parseFloat(produto.preco),
      idFornecedor: parseInt(produto.idFornecedor)
    };
    if (id) {
      updateProduct(produtoToSave);
    } else {
      addProduct(produtoToSave);
    }
    navigate('/menu-produto');
  };

  const handleCancel = () => {
    navigate('/menu-produto');
  };

  return (
    <Layout title={id ? "EDITAR PRODUTO" : "ADICIONAR PRODUTO"}>
      <Form onSubmit={handleSubmit} onCancel={handleCancel}>
        <FormInput
          label="ID"
          id="id"
          name="id"
          type="number"
          value={produto.id}
          onChange={handleChange}
          required
          disabled={!!id}
        />
        <FormInput
          label="Nome"
          id="nome"
          name="nome"
          type="text"
          value={produto.nome}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Tipo"
          id="tipo"
          name="tipo"
          type="text"
          value={produto.tipo}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Quantidade"
          id="quantidade"
          name="quantidade"
          type="number"
          value={produto.quantidade}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Preço"
          id="preco"
          name="preco"
          type="number"
          step="0.01"
          value={produto.preco}
          onChange={handleChange}
          required
        />
        <FormInput
          label="ID do Fornecedor"
          id="idFornecedor"
          name="idFornecedor"
          type="number"
          value={produto.idFornecedor}
          onChange={handleChange}
          required
        />
      </Form>
    </Layout>
  );
};

export default AdicionarProduto;
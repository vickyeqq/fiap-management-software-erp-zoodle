import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';

const EditarItensPedido = () => {
  const [itens, setItens] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();

  useEffect(() => {
    const carregarItens = async () => {
      try {
        const response = await fetch(http://localhost:8080/api/v1/itens-pedido/${id});
        if (!response.ok) {
          throw new Error('Falha ao buscar itens do pedido');
        }
        const data = await response.json();
        setItens(data);
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      }
    };

    carregarItens();
    setProdutos(products);
  }, [id, products]);

  const handleAddItem = () => {
    setItens([...itens, { idPedido: Number(id), idProduto: '', quantidade: 1 }]);
  };

  const handleRemoveItem = (index) => {
    const newItens = itens.filter((_, i) => i !== index);
    setItens(newItens);
  };

  const handleItemChange = (index, field, value) => {
    const newItens = [...itens];
    if (field === 'quantidade') {
      newItens[index][field] = Math.max(1, parseInt(value) || 1);
    } else if (field === 'idProduto') {
      newItens[index][field] = Number(value);
    } else {
      newItens[index][field] = value;
    }
    setItens(newItens);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itensToSend = itens.map(item => ({
        idPedido: Number(id),
        idProduto: Number(item.idProduto),
        quantidade: Number(item.quantidade)
      }));

      console.log('Dados sendo enviados:', itensToSend);

      const response = await fetch(http://localhost:8080/api/v1/itens-pedido, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itensToSend),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Resposta do servidor:', errorData);
        throw new Error(errorData || 'Falha ao salvar itens do pedido');
      }

      navigate(/detalhe-pedido/${id});
    } catch (error) {
      console.error('Erro ao salvar itens:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  return (
    <Layout title="Editar Itens do Pedido">
      <form onSubmit={handleSubmit}>
        {itens.map((item, index) => (
          <div key={index} className="item-pedido">
            <FormSelect
              label="Produto"
              value={item.idProduto}
              onChange={(e) => handleItemChange(index, 'idProduto', e.target.value)}
              options={produtos.map(p => ({ value: p.id, label: p.nome }))}
            />
            <FormInput
              label="Quantidade"
              type="number"
              value={item.quantidade}
              onChange={(e) => handleItemChange(index, 'quantidade', e.target.value)}
              min="1"
            />
            <button type="button" onClick={() => handleRemoveItem(index)}>Remover</button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>Adicionar Item</button>
        <button type="submit">Salvar Alterações</button>
      </form>
    </Layout>
  );
};

export default EditarItensPedido;
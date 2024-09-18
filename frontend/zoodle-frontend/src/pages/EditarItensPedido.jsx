import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import Layout from '../components/Layout';
import FormSelect from '../components/FormSelect';
import FormInput from '../components/FormInput';

const EditarItensPedido = () => {
  const [itens, setItens] = useState([]);
  const [pedido, setPedido] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();

  useEffect(() => {
    const fetchPedidoEItens = async () => {
      try {
        const pedidoResponse = await fetch(`http://localhost:8080/api/v1/pedido/${id}`);
        if (!pedidoResponse.ok) {
          throw new Error('Falha ao buscar detalhes do pedido');
        }
        const pedidoData = await pedidoResponse.json();
        setPedido(pedidoData);

        const itensResponse = await fetch(`http://localhost:8080/api/v1/itens-pedido/${id}`);
        if (!itensResponse.ok) {
          throw new Error('Falha ao buscar itens do pedido');
        }
        const itensData = await itensResponse.json();
        setItens(itensData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchPedidoEItens();
  }, [id]);

  const handleAddNewItem = () => {
    setItens([...itens, { idPedido: Number(id), idProduto: '', quantidade: 0 }]);
  };

  const handleRemoveItem = async (index) => {
    const itemToRemove = itens[index];
    if (itemToRemove.idProduto) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/itens-pedido/${id}/${itemToRemove.idProduto}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Falha ao remover item');
        }
      } catch (error) {
        console.error('Erro ao remover item:', error);
        return;
      }
    }
    const newItens = itens.filter((_, i) => i !== index);
    setItens(newItens);
  };

  const handleItemChange = (index, field, value) => {
    const newItens = [...itens];
    newItens[index][field] = field === 'idProduto' ? Number(value) : Number(value);
    setItens(newItens);
  };

  const handleAddOrUpdateItem = async (item, index) => {
    const itemToSave = {
      idPedido: Number(id),
      idProduto: Number(item.idProduto),
      quantidade: Number(item.quantidade)
    };

    try {
      const response = await fetch(`http://localhost:8080/api/v1/itens-pedido`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemToSave),
      });
      if (!response.ok) {
        throw new Error('Falha ao salvar item');
      }
      const savedItem = await response.json();
      const newItens = [...itens];
      newItens[index] = savedItem;
      setItens(newItens);
    } catch (error) {
      console.error('Erro ao salvar item:', error);
    }
  };

  if (!pedido) {
    return <Layout title="Carregando..."><p>Carregando detalhes do pedido...</p></Layout>;
  }

  return (
    <Layout title={`Editar Itens do Pedido #${id}`}>
      <div className="content">
        <div className="all-form">
          <div className="pedido-info">
            <h2>Informações do Pedido</h2>
            <p><strong>ID do Pedido:</strong> {pedido.id}</p>
            <p><strong>Data do Pedido:</strong> {new Date(pedido.data).toLocaleDateString()}</p>
            <p><strong>ID do Usuário:</strong> {pedido.idUsuario}</p>
          </div>
          <button onClick={handleAddNewItem} className="add-button">Adicionar Item</button>
          {itens.map((item, index) => (
            <div key={index} className="item-pedido">
              <div className="item-pedido-content">
                <FormSelect
                  label="Produto"
                  value={item.idProduto}
                  onChange={(e) => handleItemChange(index, 'idProduto', e.target.value)}
                  options={products.map(p => ({ value: p.id, label: p.nome }))}
                />
                <FormInput
                  label="Quantidade"
                  type="number"
                  value={item.quantidade}
                  onChange={(e) => handleItemChange(index, 'quantidade', e.target.value)}
                  min="1"
                />
                <div className="item-pedido-buttons">
                  <button onClick={() => handleAddOrUpdateItem(item, index)} className="save-button neutral-button">Salvar</button>
                  <button onClick={() => handleRemoveItem(index)} className="remove-button neutral-button">Remover</button>
                </div>
              </div>
            </div>
          ))}
          <div className="form-buttons">
            <button onClick={() => navigate(`/detalhe-pedido/${id}`)} className="cancel-button">Voltar</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditarItensPedido;
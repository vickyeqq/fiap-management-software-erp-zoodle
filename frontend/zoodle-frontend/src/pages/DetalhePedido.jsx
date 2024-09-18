import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import { useProducts } from '../contexts/ProductContext';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import Modal from '../components/Modal';
import ItensPedidoList from '../components/ItensPedidoList';

const DetalhePedido = () => {
  const [pedido, setPedido] = useState(null);
  const [itensPedido, setItensPedido] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, deleteOrder } = useOrders();
  const { products } = useProducts();

  useEffect(() => {
    const fetchPedidoEItens = async () => {
      const orderToShow = orders.find(o => o.id === parseInt(id));
      if (orderToShow) {
        setPedido(orderToShow);
        
        try {
          const response = await fetch(`http://localhost:8080/api/v1/itens-pedido/${id}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar itens do pedido');
          }
          const itensData = await response.json();
          
          const itensComProdutos = itensData.map(item => {
            const product = products.find(p => p.id === item.idProduto);
            return {
              ...item,
              nomeProduto: product ? product.nome : 'Produto não encontrado',
              precoUnitario: product ? product.preco : 0
            };
          });
          
          setItensPedido(itensComProdutos);
        } catch (error) {
          console.error('Erro ao buscar itens do pedido:', error);
          setItensPedido([]);
        }
      } else {
        navigate('/menu-pedido');
      }
    };

    fetchPedidoEItens();
  }, [id, orders, products, navigate]);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleUpdate = () => {
    navigate(`/adicionar-pedido/${id}`);
  };

  const handleEditItems = () => {
    navigate(`/editar-itens-pedido/${id}`);
  };

  const handleConfirmarExclusao = async () => {
    try {
      await deleteOrder(parseInt(id));
      setModalVisible(false);
      navigate('/menu-pedido');
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  if (!pedido) {
    return <Layout title="Carregando..."><p>Carregando detalhes do pedido...</p></Layout>;
  }

  return (
    <Layout title="DETALHES DO PEDIDO">
      
      <div className="content">
      <div className="action-buttons">
        <a  onClick={handleEditItems} className="other-button">Editar Itens</a>
      </div>
        <form className="all-form">
          <FormInput
            label="ID do Pedido"
            id="id"
            name="id"
            value={pedido.id.toString()}
            readOnly
          />
          <FormInput
            label="Data do Pedido"
            id="data"
            name="data"
            value={pedido.data}
            readOnly
          />
          <FormInput
            label="ID do Usuário"
            id="idUsuario"
            name="idUsuario"
            value={pedido.idUsuario.toString()}
            readOnly
          />
        </form>
        
        <ItensPedidoList itens={itensPedido} />

        <div className="button-container">

          <button type="button" className="update-button" onClick={handleUpdate}>Atualizar Pedido</button>
          <button type="button" className="delete-button" onClick={handleDelete}>Deletar Pedido</button>
        </div>
      </div>
      
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="DELETAR PEDIDO"
        content={
          <>
            <p>Você está prestes a <span className="delete-text">deletar</span> o pedido com ID "<span id="order-id">{pedido.id}</span>" do sistema. Esta ação é irreversível.</p>
            <p>Detalhes do Pedido:</p>
            <ul>
              <li>ID: <span id="order-detail-id">{pedido.id}</span></li>
              <li>Data: <span id="order-detail-date">{pedido.data}</span></li>
              <li>ID do Usuário: <span id="order-detail-user">{pedido.idUsuario}</span></li>
              <li>Total de Itens: <span id="order-detail-items">{itensPedido.length}</span></li>
            </ul>
            <p>Tem certeza que deseja proceder com a exclusão?</p>
          </>
        }
        onConfirm={handleConfirmarExclusao}
      />
    </Layout>
  );
};

export default DetalhePedido;
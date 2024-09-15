import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import MenuLayout from '../components/MenuLayout';
import MenuList from '../components/MenuList';
import Modal from '../components/Modal';
import orderIcon from '../assets/img/delivery-icon.png';

const MenuPedido = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const navigate = useNavigate();
  const { orders, deleteOrder } = useOrders();

  const handleOrderClick = (orderId) => {
    navigate(`/detalhe-pedido/${orderId}`);
  };

  const handleDelete = (order) => {
    setSelectedPedido(order);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPedido) {
      deleteOrder(selectedPedido.id);
      setModalVisible(false);
    }
  };

  // Transformar os pedidos para o formato esperado pelo MenuList
  const formattedOrders = orders.map(order => ({
    id: order.id,
    nome: `Pedido #${order.id}`, // Ajuste conforme necessário
  }));

  return (
    <MenuLayout title="PEDIDOS">
      <a href="/adicionar-pedido" className="add-button">Adicionar</a>
      <MenuList
        items={formattedOrders}
        onItemClick={handleOrderClick}
        onDelete={handleDelete}
        IconComponent={() => <img src={orderIcon} alt="Pedido" />}
      />
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="DELETAR PEDIDO"
        content={
          selectedPedido && (
            <>
              <p>Você está prestes a <span className="delete-text">deletar</span> o pedido "<span id="order-id">{selectedPedido.nome}</span>" do sistema. Esta ação é irreversível.</p>
              <p>Tem certeza que deseja proceder com a exclusão?</p>
            </>
          )
        }
        onConfirm={handleConfirmDelete}
      />
    </MenuLayout>
  );
};

export default MenuPedido;
import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pedido`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  const addOrder = async (order) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pedido`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newOrder = await response.json();
      setOrders([...orders, newOrder]);
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
      throw error;
    }
  };

  const updateOrder = async (updatedOrder) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pedido/${updatedOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(orders.map(o => o.id === updatedOrder.id ? data : o));
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw error;
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pedido/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setOrders(orders.filter(o => o.id !== orderId));
      return true;
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
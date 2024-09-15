import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import Layout from '../components/Layout';
import Form from '../components/Form';
import FormInput from '../components/FormInput';

const AdicionarPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orders, addOrder, updateOrder } = useOrders();
  const [pedido, setPedido] = useState({
    id: '',
    data: '',
    idUsuario: ''
  });

  useEffect(() => {
    if (id) {
      const orderToEdit = orders.find(o => o.id === parseInt(id));
      if (orderToEdit) {
        setPedido({
          id: orderToEdit.id.toString(),
          data: orderToEdit.data,
          idUsuario: orderToEdit.idUsuario.toString()
        });
      }
    }
  }, [id, orders]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido(prevPedido => ({
      ...prevPedido,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pedidoToSave = {
      ...pedido,
      id: parseInt(pedido.id),
      idUsuario: parseInt(pedido.idUsuario)
    };
    try {
      if (id) {
        await updateOrder(pedidoToSave);
      } else {
        await addOrder(pedidoToSave);
      }
      navigate('/menu-pedido');
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  const handleCancel = () => {
    navigate('/menu-pedido');
  };

  return (
    <Layout title={id ? "EDITAR PEDIDO" : "ADICIONAR PEDIDO"}>
      <Form onSubmit={handleSubmit} onCancel={handleCancel}>
        <FormInput
          label="ID"
          id="id"
          name="id"
          type="number"
          value={pedido.id}
          onChange={handleChange}
          required
          disabled={!!id}
        />
        <FormInput
          label="Data"
          id="data"
          name="data"
          type="date"
          value={pedido.data}
          onChange={handleChange}
          required
        />
        <FormInput
          label="ID do Usuário"
          id="idUsuario"
          name="idUsuario"
          type="number"
          value={pedido.idUsuario}
          onChange={handleChange}
          required
        />
      </Form>
    </Layout>
  );
};

export default AdicionarPedido;
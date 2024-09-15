import React from 'react';
import PropTypes from 'prop-types';

const ItensPedidoList = ({ itens }) => {
  const totalPedido = itens.reduce((total, item) => total + item.quantidade * item.precoUnitario, 0);

  return (
    <div className="itens-pedido">
      <h3>Itens do Pedido</h3>
      <table className="itens-pedido-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item.idProduto}>
              <td>{item.nomeProduto}</td>
              <td>{item.quantidade}</td>
              <td>R$ {item.precoUnitario.toFixed(2)}</td>
              <td>R$ {(item.quantidade * item.precoUnitario).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"><strong>Total do Pedido</strong></td>
            <td><strong>R$ {totalPedido.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

ItensPedidoList.propTypes = {
  itens: PropTypes.arrayOf(PropTypes.shape({
    idProduto: PropTypes.number.isRequired,
    nomeProduto: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
    precoUnitario: PropTypes.number.isRequired,
  })).isRequired,
};

export default ItensPedidoList;
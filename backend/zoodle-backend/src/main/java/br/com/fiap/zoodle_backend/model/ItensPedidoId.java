package br.com.fiap.zoodle_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

import java.io.Serializable;

public class ItensPedidoId  implements Serializable {
    private Long idPedido;
    private Long idProduto;

    public ItensPedidoId() {
    }
}

package br.com.fiap.zoodle_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ItensPedido")
@IdClass(ItensPedidoId.class)
public class ItensPedido {

    @Id
    @Column(nullable = false)
    private Long idPedido;
    @Id
    @Column(nullable = false)
    private Long idProduto;

    @Column(nullable = false)
    private Long quantidade;

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Long idProduto) {
        this.idProduto = idProduto;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }
}

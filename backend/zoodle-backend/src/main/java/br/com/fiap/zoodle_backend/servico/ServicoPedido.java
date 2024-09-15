package br.com.fiap.zoodle_backend.servico;

import br.com.fiap.zoodle_backend.model.Pedido;
import br.com.fiap.zoodle_backend.repositorio.RepositorioPedido;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoPedido {
    private final RepositorioPedido repositorioPedido;

    public ServicoPedido(RepositorioPedido repositorioPedido) {
        this.repositorioPedido = repositorioPedido;
    }

    public Pedido salvarPedido(Pedido pedido) {
        try {
            return repositorioPedido.save(pedido);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao salvar pedido: " + e.getMessage());
        }
    }

    public List<Pedido> buscarTodosPedidos() {
        try {
            return repositorioPedido.findAll();
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar todos os pedidos: " + e.getMessage());
        }
    }

    public Optional<Pedido> buscarPedidoPorId(Long id) {
        try {
            return repositorioPedido.findById(id);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar pedido por ID: " + e.getMessage());
        }
    }

    public Optional<Pedido> atualizarPedido(Long id, Pedido pedidoAtualizado) {
        try {
            Optional<Pedido> pedidoExistenteOptional = repositorioPedido.findById(id);
            if (pedidoExistenteOptional.isPresent()) {
                Pedido pedidoExistente = pedidoExistenteOptional.get();
                pedidoExistente.setData(pedidoAtualizado.getData());
                pedidoExistente.setIdUsuario(pedidoAtualizado.getIdUsuario());
                Pedido entidadeSalva = repositorioPedido.save(pedidoExistente);
                return Optional.of(entidadeSalva);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao atualizar pedido: " + e.getMessage());
        }
    }

    public boolean deletarPedido(Long id) {
        try {
            repositorioPedido.deleteById(id);
            return true; // Deleção bem-sucedida
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao deletar pedido: " + e.getMessage());
        }
    }
}
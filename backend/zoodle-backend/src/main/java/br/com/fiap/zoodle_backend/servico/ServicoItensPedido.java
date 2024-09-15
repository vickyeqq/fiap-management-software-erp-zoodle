package br.com.fiap.zoodle_backend.servico;

import br.com.fiap.zoodle_backend.model.ItensPedido;
import br.com.fiap.zoodle_backend.repositorio.RepositorioItensPedido;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoItensPedido {
    private final RepositorioItensPedido repositorioItensPedido;

    public ServicoItensPedido(RepositorioItensPedido repositorioItensPedido) {
        this.repositorioItensPedido = repositorioItensPedido;
    }

    public ItensPedido salvarItensPedido(ItensPedido itensPedido) {
        try {
            return repositorioItensPedido.save(itensPedido);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao salvar itens do pedido: " + e.getMessage());
        }
    }

    public List<ItensPedido> buscarTodosItensPedido() {
        try {
            return repositorioItensPedido.findAll();
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar todos os itens de pedido: " + e.getMessage());
        }
    }

    public List<ItensPedido> buscarItensPedidoPorId(Long id) {
        try {
            return repositorioItensPedido.buscaItensPorPedido(id);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar itens de pedido por ID: " + e.getMessage());
        }
    }

    public Optional<ItensPedido> atualizarItensPedido(Long id, ItensPedido itensPedidoAtualizado) {
        try {
            Optional<ItensPedido> itensPedidoExistenteOptional = repositorioItensPedido.findById(id);
            if (itensPedidoExistenteOptional.isPresent()) {
                ItensPedido itensPedidoExistente = itensPedidoExistenteOptional.get();
                itensPedidoExistente.setIdPedido(itensPedidoAtualizado.getIdPedido());
                itensPedidoExistente.setIdProduto(itensPedidoAtualizado.getIdProduto());
                itensPedidoExistente.setQuantidade(itensPedidoAtualizado.getQuantidade());
                ItensPedido entidadeSalva = repositorioItensPedido.save(itensPedidoExistente);
                return Optional.of(entidadeSalva);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao atualizar itens de pedido: " + e.getMessage());
        }
    }

    public boolean deletarItensPedido(Long idPedido, Long idProduto) {
        try {
            repositorioItensPedido.deletaItensDoPedido(idPedido, idProduto);
            return true; // Deleção bem-sucedida
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao deletar itens de pedido: " + e.getMessage());
        }
    }
}
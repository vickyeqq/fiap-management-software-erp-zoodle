package br.com.fiap.zoodle_backend.servico;

import br.com.fiap.zoodle_backend.model.Produto;
import br.com.fiap.zoodle_backend.repositorio.RepositorioProduto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoProduto {
    private final RepositorioProduto repositorioProduto;

    public ServicoProduto(RepositorioProduto repositorioProduto) {
        this.repositorioProduto = repositorioProduto;
    }

    public Produto salvarProduto(Produto produto) {
        try {
            return repositorioProduto.save(produto);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao salvar produto: " + e.getMessage());
        }
    }

    public List<Produto> buscarTodosProdutos() {
        try {
            return repositorioProduto.findAll();
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar todos os produtos: " + e.getMessage());
        }
    }

    public Optional<Produto> buscarProdutoPorId(Long id) {
        try {
            return repositorioProduto.findById(id);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar produto por ID: " + e.getMessage());
        }
    }

    public Optional<Produto> atualizarProduto(Long id, Produto produtoAtualizado) {
        try {
            Optional<Produto> produtoExistenteOptional = repositorioProduto.findById(id);
            if (produtoExistenteOptional.isPresent()) {
                Produto produtoExistente = produtoExistenteOptional.get();
                produtoExistente.setNome(produtoAtualizado.getNome());
                produtoExistente.setPreco(produtoAtualizado.getPreco());
                produtoExistente.setQuantidade(produtoAtualizado.getQuantidade());
                produtoExistente.setTipo(produtoAtualizado.getTipo());
                produtoExistente.setIdFornecedor(produtoAtualizado.getIdFornecedor());
                Produto entidadeSalva = repositorioProduto.save(produtoExistente);
                return Optional.of(entidadeSalva);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao atualizar produto: " + e.getMessage());
        }
    }

    public boolean deletarProduto(Long id) {
        try {
            repositorioProduto.deleteById(id);
            return true; // Deleção bem-sucedida
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao deletar produto: " + e.getMessage());
        }
    }
}
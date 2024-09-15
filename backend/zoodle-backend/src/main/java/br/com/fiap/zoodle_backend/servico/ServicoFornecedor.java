package br.com.fiap.zoodle_backend.servico;

import br.com.fiap.zoodle_backend.model.Fornecedor;
import br.com.fiap.zoodle_backend.repositorio.RepositorioFornecedor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoFornecedor {
    private final RepositorioFornecedor repositorioFornecedor;

    public ServicoFornecedor(RepositorioFornecedor repositorioFornecedor) {
        this.repositorioFornecedor = repositorioFornecedor;
    }

    public Fornecedor salvarFornecedor(Fornecedor fornecedor) {
        try {
            return repositorioFornecedor.save(fornecedor);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao salvar fornecedor: " + e.getMessage());
        }
    }

    public List<Fornecedor> buscarTodosFornecedores() {
        try {
            return repositorioFornecedor.findAll();
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar todos os fornecedores: " + e.getMessage());
        }
    }

    public Optional<Fornecedor> buscarFornecedorPorId(Long id) {
        try {
            return repositorioFornecedor.findById(id);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar fornecedor por ID: " + e.getMessage());
        }
    }

    public Optional<Fornecedor> atualizarFornecedor(Long id, Fornecedor fornecedorAtualizado) {
        try {
            Optional<Fornecedor> fornecedorExistenteOptional = repositorioFornecedor.findById(id);
            if (fornecedorExistenteOptional.isPresent()) {
                Fornecedor fornecedorExistente = fornecedorExistenteOptional.get();
                fornecedorExistente.setNome(fornecedorAtualizado.getNome());
                fornecedorExistente.setEndereco(fornecedorAtualizado.getEndereco());
                fornecedorExistente.setTelefone(fornecedorAtualizado.getTelefone());
                Fornecedor entidadeSalva = repositorioFornecedor.save(fornecedorExistente);
                return Optional.of(entidadeSalva);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao atualizar fornecedor: " + e.getMessage());
        }
    }

    public boolean deletarFornecedor(Long id) {
        try {
            repositorioFornecedor.deleteById(id);
            return true; // Deleção bem-sucedida
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao deletar fornecedor: " + e.getMessage());
        }
    }
}
package br.com.fiap.zoodle_backend.servico;

import br.com.fiap.zoodle_backend.model.TipoUsuario;
import br.com.fiap.zoodle_backend.repositorio.RepositorioTipoUsuario;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoTipoUsuario {
    private final RepositorioTipoUsuario repositorioTipoUsuario;

    public ServicoTipoUsuario(RepositorioTipoUsuario repositorioTipoUsuario) {
        this.repositorioTipoUsuario = repositorioTipoUsuario;
    }

    public TipoUsuario salvarTipoUsuario(TipoUsuario tipoUsuario) {
        try {
            return repositorioTipoUsuario.save(tipoUsuario);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao salvar tipo de usuário: " + e.getMessage());
        }
    }

    public List<TipoUsuario> buscarTodosTiposUsuario() {
        try {
            return repositorioTipoUsuario.findAll();
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar todos os tipos de usuário: " + e.getMessage());
        }
    }

    public Optional<TipoUsuario> buscarTipoUsuarioPorId(Long id) {
        try {
            return repositorioTipoUsuario.findById(id);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar tipo de usuário por ID: " + e.getMessage());
        }
    }

    public Optional<TipoUsuario> atualizarTipoUsuario(Long id, TipoUsuario tipoUsuarioAtualizado) {
        try {
            Optional<TipoUsuario> tipoUsuarioExistenteOptional = repositorioTipoUsuario.findById(id);
            if (tipoUsuarioExistenteOptional.isPresent()) {
                TipoUsuario tipoUsuarioExistente = tipoUsuarioExistenteOptional.get();
                tipoUsuarioExistente.setNome(tipoUsuarioAtualizado.getNome());
                TipoUsuario entidadeSalva = repositorioTipoUsuario.save(tipoUsuarioExistente);
                return Optional.of(entidadeSalva);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao atualizar tipo de usuário: " + e.getMessage());
        }
    }

    public boolean deletarTipoUsuario(Long id) {
        try {
            repositorioTipoUsuario.deleteById(id);
            return true; // Deleção bem-sucedida
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao deletar tipo de usuário: " + e.getMessage());
        }
    }
}
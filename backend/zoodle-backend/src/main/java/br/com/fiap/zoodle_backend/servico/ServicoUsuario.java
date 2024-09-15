package br.com.fiap.zoodle_backend.servico;

import br.com.fiap.zoodle_backend.model.Usuario;
import br.com.fiap.zoodle_backend.repositorio.RepositorioUsuario;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoUsuario {

    private final RepositorioUsuario repositorioUsuario;

    public ServicoUsuario(RepositorioUsuario repositorioUsuario) {
        this.repositorioUsuario = repositorioUsuario;
    }

    public Usuario salvarUsuario(Usuario usuario) {
        try {
            return repositorioUsuario.save(usuario);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao salvar usuário: " + e.getMessage());
        }
    }

    public List<Usuario> buscarTodosUsuarios() {
        try {
            return repositorioUsuario.findAll();
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar todos os usuários: " + e.getMessage());
        }
    }

    public Optional<Usuario> buscarUsuarioPorId(Long id) {
        try {
            return repositorioUsuario.findById(id);
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao buscar usuário por ID: " + e.getMessage());
        }
    }

    public Optional<Usuario> atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        try {
            Optional<Usuario> usuarioExistenteOptional = repositorioUsuario.findById(id);
            if (usuarioExistenteOptional.isPresent()) {
                Usuario usuarioExistente = usuarioExistenteOptional.get();
                usuarioExistente.setNome(usuarioAtualizado.getNome());
                usuarioExistente.setTipoUsuario(usuarioAtualizado.getTipoUsuario());
                Usuario entidadeSalva = repositorioUsuario.save(usuarioExistente);
                return Optional.of(entidadeSalva);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao atualizar usuário: " + e.getMessage());
        }
    }

    public boolean deletarUsuario(Long id) {
        try {
            repositorioUsuario.deleteById(id);
            return true; // Deleção bem-sucedida
        } catch (Exception e) {
            // Handle exception or log the error
            throw new RuntimeException("Falha ao deletar usuário: " + e.getMessage());
        }
    }
}
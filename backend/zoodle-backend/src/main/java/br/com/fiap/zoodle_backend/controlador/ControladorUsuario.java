package br.com.fiap.zoodle_backend.controlador;

import br.com.fiap.zoodle_backend.model.Usuario;
import br.com.fiap.zoodle_backend.servico.ServicoUsuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/usuario")
public class ControladorUsuario {

    private final ServicoUsuario servicoUsuario;

    public ControladorUsuario(ServicoUsuario servicoUsuario) {
        this.servicoUsuario = servicoUsuario;
    }

    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioCadastrado = servicoUsuario.salvarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCadastrado);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = servicoUsuario.buscarTodosUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuarioOptional = servicoUsuario.buscarUsuarioPorId(id);
        return usuarioOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioAtualizadoOptional = servicoUsuario.atualizarUsuario(id, usuario);
        return usuarioAtualizadoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerUsuario(@PathVariable Long id) {
        boolean statusRemocao = servicoUsuario.deletarUsuario(id);
        if (statusRemocao) {
            return ResponseEntity.ok("Usuário com ID " + id + " foi removido com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao remover Usuário com ID " + id);
        }
    }
}
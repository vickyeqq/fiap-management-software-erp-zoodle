package br.com.fiap.zoodle_backend.controlador;

import br.com.fiap.zoodle_backend.model.TipoUsuario;
import br.com.fiap.zoodle_backend.servico.ServicoTipoUsuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/tipo-usuario")
public class ControladorTipoUsuario {

    private final ServicoTipoUsuario servicoTipoUsuario;

    public ControladorTipoUsuario(ServicoTipoUsuario servicoTipoUsuario) {
        this.servicoTipoUsuario = servicoTipoUsuario;
    }

    @PostMapping
    public ResponseEntity<TipoUsuario> criarTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
        TipoUsuario tipoUsuarioCriado = servicoTipoUsuario.salvarTipoUsuario(tipoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(tipoUsuarioCriado);
    }

    @GetMapping
    public ResponseEntity<List<TipoUsuario>> listarTiposUsuario() {
        List<TipoUsuario> tiposUsuario = servicoTipoUsuario.buscarTodosTiposUsuario();
        return ResponseEntity.ok(tiposUsuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoUsuario> buscarTipoUsuarioPorId(@PathVariable Long id) {
        Optional<TipoUsuario> tipoUsuarioOptional = servicoTipoUsuario.buscarTipoUsuarioPorId(id);
        return tipoUsuarioOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoUsuario> atualizarTipoUsuario(@PathVariable Long id, @RequestBody TipoUsuario tipoUsuario) {
        Optional<TipoUsuario> tipoUsuarioAtualizadoOptional = servicoTipoUsuario.atualizarTipoUsuario(id, tipoUsuario);
        return tipoUsuarioAtualizadoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerTipoUsuario(@PathVariable Long id) {
        boolean statusRemocao = servicoTipoUsuario.deletarTipoUsuario(id);
        if (statusRemocao) {
            return ResponseEntity.ok("Tipo de Usuário com ID " + id + " foi removido com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao remover Tipo de Usuário com ID " + id);
        }
    }

}
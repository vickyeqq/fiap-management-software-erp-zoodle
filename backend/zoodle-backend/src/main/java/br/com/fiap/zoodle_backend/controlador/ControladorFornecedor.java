package br.com.fiap.zoodle_backend.controlador;

import br.com.fiap.zoodle_backend.model.Fornecedor;
import br.com.fiap.zoodle_backend.servico.ServicoFornecedor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/fornecedor")
public class ControladorFornecedor {

    private final ServicoFornecedor servicoFornecedor;

    public ControladorFornecedor(ServicoFornecedor servicoFornecedor) {
        this.servicoFornecedor = servicoFornecedor;
    }

    @PostMapping
    public ResponseEntity<Fornecedor> salvarFornecedor(@RequestBody Fornecedor fornecedor) {
        Fornecedor fornecedorSalvo = servicoFornecedor.salvarFornecedor(fornecedor);
        return ResponseEntity.ok(fornecedorSalvo);
    }

    @GetMapping
    public ResponseEntity<List<Fornecedor>> buscarTodosFornecedores() {
        List<Fornecedor> fornecedores = servicoFornecedor.buscarTodosFornecedores();
        return ResponseEntity.ok(fornecedores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> buscarFornecedorPorId(@PathVariable Long id) {
        Optional<Fornecedor> fornecedorOptional = servicoFornecedor.buscarFornecedorPorId(id);
        return fornecedorOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fornecedor> atualizarFornecedor(@PathVariable Long id, @RequestBody Fornecedor fornecedor) {
        Optional<Fornecedor> fornecedorAtualizadoOptional = servicoFornecedor.atualizarFornecedor(id, fornecedor);
        return fornecedorAtualizadoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarFornecedor(@PathVariable Long id) {
        boolean statusDelecao = servicoFornecedor.deletarFornecedor(id);
        if (statusDelecao) {
            return ResponseEntity.ok("Fornecedor com ID " + id + " foi deletado com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao deletar fornecedor com ID " + id);
        }
    }
}
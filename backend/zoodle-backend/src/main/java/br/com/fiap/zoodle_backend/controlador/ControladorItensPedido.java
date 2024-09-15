package br.com.fiap.zoodle_backend.controlador;

import br.com.fiap.zoodle_backend.model.ItensPedido;
import br.com.fiap.zoodle_backend.servico.ServicoItensPedido;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/itens-pedido")
public class ControladorItensPedido {

    private final ServicoItensPedido servicoItensPedido;

    public ControladorItensPedido(ServicoItensPedido servicoItensPedido) {
        this.servicoItensPedido = servicoItensPedido;
    }

    @PostMapping
    public ResponseEntity<ItensPedido> salvarItensPedido(@RequestBody ItensPedido itensPedido) {
        ItensPedido itensPedidoSalvo = servicoItensPedido.salvarItensPedido(itensPedido);
        return ResponseEntity.ok(itensPedidoSalvo);
    }

    @GetMapping
    public ResponseEntity<List<ItensPedido>> buscarTodosItensPedido() {
        List<ItensPedido> itensPedidos = servicoItensPedido.buscarTodosItensPedido();
        return ResponseEntity.ok(itensPedidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ItensPedido>> buscarItensPedidoPorId(@PathVariable Long id) {
        List<ItensPedido> itensPedido = servicoItensPedido.buscarItensPedidoPorId(id);
        return ResponseEntity.ok(itensPedido);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItensPedido> atualizarItensPedido(@PathVariable Long id, @RequestBody ItensPedido itensPedido) {
        Optional<ItensPedido> itensPedidoAtualizadoOptional = servicoItensPedido.atualizarItensPedido(id, itensPedido);
        return itensPedidoAtualizadoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{idPedido}/{idProduto}")
    public ResponseEntity<String> deletarItensPedido(@PathVariable Long idPedido, @PathVariable Long idProduto) {
        boolean statusDelecao = servicoItensPedido.deletarItensPedido(idPedido, idProduto);
        if (statusDelecao) {
            return ResponseEntity.ok("ItensPedido com ID " + idProduto + " foi deletado com sucesso do pedido " + idPedido);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao deletar ItensPedido com ID " + idProduto + " do pedido " + idPedido);
        }
    }
}
package br.com.fiap.zoodle_backend.controlador;

import br.com.fiap.zoodle_backend.model.Pedido;
import br.com.fiap.zoodle_backend.servico.ServicoPedido;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/pedido")
public class ControladorPedido {

    private final ServicoPedido servicoPedido;

    public ControladorPedido(ServicoPedido servicoPedido) {
        this.servicoPedido = servicoPedido;
    }

    @PostMapping
    public ResponseEntity<Pedido> criarPedido(@RequestBody Pedido pedido) {
        Pedido pedidoCriado = servicoPedido.salvarPedido(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoCriado);
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> listarPedidos() {
        List<Pedido> pedidos = servicoPedido.buscarTodosPedidos();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPedidoPorId(@PathVariable Long id) {
        Optional<Pedido> pedidoOptional = servicoPedido.buscarPedidoPorId(id);
        return pedidoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> atualizarPedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        Optional<Pedido> pedidoAtualizadoOptional = servicoPedido.atualizarPedido(id, pedido);
        return pedidoAtualizadoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelarPedido(@PathVariable Long id) {
        boolean statusCancelamento = servicoPedido.deletarPedido(id);
        if (statusCancelamento) {
            return ResponseEntity.ok("Pedido com ID " + id + " foi cancelado com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao cancelar pedido com ID " + id);
        }
    }

}
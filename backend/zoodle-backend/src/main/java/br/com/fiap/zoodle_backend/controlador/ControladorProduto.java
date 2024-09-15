package br.com.fiap.zoodle_backend.controlador;

import br.com.fiap.zoodle_backend.model.Produto;
import br.com.fiap.zoodle_backend.servico.ServicoProduto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/produto")
public class ControladorProduto {

    private final ServicoProduto servicoProduto;

    public ControladorProduto(ServicoProduto servicoProduto) {
        this.servicoProduto = servicoProduto;
    }

    @PostMapping
    public ResponseEntity<Produto> cadastrarProduto(@RequestBody Produto produto) {
        Produto produtoCadastrado = servicoProduto.salvarProduto(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoCadastrado);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> produtos = servicoProduto.buscarTodosProdutos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProdutoPorId(@PathVariable Long id) {
        Optional<Produto> produtoOptional = servicoProduto.buscarProdutoPorId(id);
        return produtoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produto) {
        Optional<Produto> produtoAtualizadoOptional = servicoProduto.atualizarProduto(id, produto);
        return produtoAtualizadoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerProduto(@PathVariable Long id) {
        boolean statusRemocao = servicoProduto.deletarProduto(id);
        if (statusRemocao) {
            return ResponseEntity.ok("Produto com ID " + id + " foi removido com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao remover produto com ID " + id);
        }
    }

}
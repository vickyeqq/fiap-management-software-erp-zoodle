package br.com.fiap.zoodle_backend.repositorio;

import br.com.fiap.zoodle_backend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioProduto extends JpaRepository<Produto, Long> {
}

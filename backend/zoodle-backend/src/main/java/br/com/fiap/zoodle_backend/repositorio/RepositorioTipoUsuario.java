package br.com.fiap.zoodle_backend.repositorio;

import br.com.fiap.zoodle_backend.model.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioTipoUsuario extends JpaRepository<TipoUsuario, Long> {
}

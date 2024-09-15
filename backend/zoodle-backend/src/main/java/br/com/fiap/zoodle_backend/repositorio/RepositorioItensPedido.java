package br.com.fiap.zoodle_backend.repositorio;

import br.com.fiap.zoodle_backend.model.ItensPedido;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioItensPedido extends JpaRepository<ItensPedido, Long> {

    @Query("SELECT i FROM ItensPedido i WHERE (i.idPedido = :idPedido) ")
    List<ItensPedido> buscaItensPorPedido(@Param("idPedido") Long idPedido);

    @Modifying
    @Transactional
    @Query("DELETE FROM ItensPedido i WHERE i.idPedido = :idPedido AND i.idProduto = :idProduto")
    void deletaItensDoPedido(@Param("idPedido") Long idPedido, @Param("idProduto") Long idProduto);

//    @Query("DELETE FROM ItensPedido i WHERE (i.idPedido = :idPedido) and (i.idProduto = :idProduto)")
//    void deletaItensDoPedido(@Param ("idPedido") Long idPedido, @Param("idProduto") Long idProduto);
}

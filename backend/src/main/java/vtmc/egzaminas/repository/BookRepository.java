package vtmc.egzaminas.repository;

import vtmc.egzaminas.model.Book;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{
	Page<Book> findByCategoryId(Long categoryId, Pageable pageable);
	Optional<Book> findByIdAndCategoryId(Long id, Long categoryId);
	
}

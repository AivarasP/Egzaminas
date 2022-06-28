package vtmc.egzaminas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vtmc.egzaminas.model.Category;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	

}

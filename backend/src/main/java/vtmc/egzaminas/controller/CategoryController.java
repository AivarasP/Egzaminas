package vtmc.egzaminas.controller;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vtmc.egzaminas.model.Category;
import vtmc.egzaminas.repository.CategoryRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/category")
public class CategoryController {

	@Autowired
	public CategoryRepository CategoryRepo;

	@GetMapping
	public List<Category> getCategory() {
		return CategoryRepo.findAll();

	}

	@GetMapping("/{id}")
	public Category getCategory(@PathVariable Long id) {
		return CategoryRepo.findById(id).get();
	}

	@PostMapping
	public Category postCategory(@RequestBody Category category) {
		return CategoryRepo.save(category);
	}

	@DeleteMapping("/{id}")
	public void deleteCategory(@PathVariable Long id) {
		CategoryRepo.deleteById(id);
	}
	
//	ResponseEntity
	@PutMapping("/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable Long id, @Valid @RequestBody Category categoryDetails) {
		Category category = CategoryRepo.findById(id).orElseThrow() ;
		
		category.setName(categoryDetails.getName());
		final Category updatedCategory = CategoryRepo.save(category);
        return ResponseEntity.ok(updatedCategory);
	}
}
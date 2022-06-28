package vtmc.egzaminas.controller;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import vtmc.egzaminas.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import vtmc.egzaminas.model.Book;
import vtmc.egzaminas.repository.BookRepository;
import vtmc.egzaminas.repository.CategoryRepository;

@Slf4j
@RestController
public class BookController {

	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@GetMapping("/api/category/{categoryId}/book")
	public Page<Book> getAllBookByCategoryId(@PathVariable(value = "categoryId") Long categoryId,
			Pageable pageable){
		return bookRepository.findByCategoryId(categoryId, pageable);
	}
	@PostMapping("/api/category/{categoryId}/book")
	public Book createBook(@PathVariable (value = "categoryId")Long categoryId,
			 @RequestBody Book book) {
		return categoryRepository.findById(categoryId).map(r -> {
			book.setCategory(r);
			log.info("Category: " + book);
			return bookRepository.save(book);
		}).orElseThrow(()-> new ResourceNotFoundException("CategoryId " + categoryId +" not found"));
	}
	@PutMapping("/api/category/{categoryId}/book/{bookId}")
    public Book updateBook(@PathVariable (value = "categoryId") Long categoryId,
                                 @PathVariable (value = "bookId") Long bookId,
                                 @Valid @RequestBody Book bookRequest) {
        if(!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("CategoryId " + categoryId + " not found");
        }

        return bookRepository.findById(bookId).map(book -> {
            book.setName(bookRequest.getName());
            book.setDescription(bookRequest.getDescription());
            book.setImagePath(bookRequest.getImagePath());
            book.setIsbn(bookRequest.getIsbn());
            book.setPages(bookRequest.getPages());
            return bookRepository.save(book);
        }).orElseThrow(() -> new ResourceNotFoundException("BookId " + bookId + "not found"));
    }

    @DeleteMapping("/api/category/{categoryId}/book/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable (value = "categoryId") Long categoryId,
                              @PathVariable (value = "bookId") Long bookId) {
        return bookRepository.findByIdAndCategoryId(bookId, categoryId).map(book -> {
        	bookRepository.delete(book);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Book not found with id " + bookId + " and CategoryId " + categoryId));
    }
}


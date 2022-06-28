package vtmc.egzaminas.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "book")
@Data
@NoArgsConstructor
public class Book {
@Id
@GeneratedValue( strategy = GenerationType.IDENTITY)
private Long id;
@NotNull
@Lob
private String name;
private String description;
private Long isbn;
private String imagePath;
private Integer pages;
@ManyToOne(fetch = FetchType.LAZY,optional = false)
@JoinColumn(name = "category_id", nullable = false)
@OnDelete(action = OnDeleteAction.CASCADE)
@JsonIgnore
private Category category;
}

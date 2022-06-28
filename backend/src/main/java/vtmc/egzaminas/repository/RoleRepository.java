package vtmc.egzaminas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vtmc.egzaminas.model.ERole;
import vtmc.egzaminas.model.Role;
@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
Optional<Role> findByName(ERole name);
}

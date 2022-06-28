package vtmc.egzaminas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import vtmc.egzaminas.model.ERole;
import vtmc.egzaminas.model.Role;
import vtmc.egzaminas.repository.RoleRepository;

@Component
public class InitData implements CommandLineRunner {

	@Autowired
	RoleRepository roleRepo;
	
	@Override
	public void run(String... args) throws Exception {
		
		if(roleRepo.findByName(ERole.ROLE_USER).isEmpty()) {
		roleRepo.save(new Role(ERole.ROLE_USER));
		}
	}

}

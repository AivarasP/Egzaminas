import React,{useState,useEffect} from "react";
import { Link} from "react-router-dom";
import './Navbar.css'
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import authHeader from "../../services/auth-header";
const Navbar = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    
  };
    return ( <div className="navbar">
        <Link to="/add-category">
         <button id="log_btns" >
            Pridėti Kategorija
        </button>
        </Link>
        <Link to="/category">
         <button id="log_btns" >
            Peržiurėti kategorijas
        </button>
        </Link>
        <Link to="/home">
         <button id="log_btns" >
            Pradžia
        </button>
        </Link>
          {currentUser ? (
          <div className="navbar-nav ml-auto">
            
            <Link to="/">
            <button id="log_btns"onClick={logOut}>
              ATSIJUNGTI
            </button>
            </Link>  
          </div>
        ) : (
          <p>404</p>
        )}
    </div> );
}
 
export default Navbar;
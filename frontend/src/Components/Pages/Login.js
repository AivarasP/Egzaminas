import React, { useState, useRef } from "react";
import {useNavigate,Link} from 'react-router-dom'
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from '../../services/auth.service';
import './Login.css'
const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
const Login = () => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      setMessage("");
      setLoading(true);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.login(username, password).then(
          () => {
            console.log("LoginPage: " + username)
             navigate("/home");
            // window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setLoading(false);
            setMessage(resMessage);
          }
        );
      } else {
        setLoading(false);
      }
    };
    return ( 
        <header className="Form">
        <h1 style={{color:"white"}}>Prisijungti</h1>
        <Form onSubmit={handleLogin} ref={form}>
        <div className='layout'> 
        <div>
        <input type="text"
               placeholder='Vardas'
               name="username"
               className="inputs"
               value={username}
               onChange={onChangeUsername}
               validations={[required]}
               >
        </input>
        </div>
        <div>
  
        <input type="password"
               placeholder='***********'
               name="username"
               value={password}
               onChange={onChangePassword}
               validations={[required]}
               className="inputs"
               >
        </input>
        <div style={{color:'black'}}>Dar neturite vartojo? <Link to="/signup" style={{color:'#33BDFF',textDecoration:'none'}}> Prisiregistruoti.</Link></div>

        </div>
        <div>
        <button id="log_btn" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm" ></span>
              )}
              Prisijungti
            </button>
            </div>
               
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </div>
        </Form>
        </header>
    );
}
 
export default Login;
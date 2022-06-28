import { Link,useNavigate } from 'react-router-dom';
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import React, {useState,useRef} from 'react';
import {isEmail} from "validator";
import Swal from 'sweetalert2';
import AuthService from '../../services/auth.service';
import './Register.css'
const required = (value) => {
       if (!value) {
         return (
           <div className="alert alert-danger" role="alert">
             This field is required!
           </div>
         );
       }
     };
     
     const validEmail = (value) => {
       if (!isEmail(value)) {
         return (
           <div className="alert alert-danger" role="alert">
             This is not a valid email.
           </div>
         );
       }
     };
     
     const vusername = (value) => {
       if (value.length < 3 || value.length > 20) {
         return (
           <div className="alert alert-danger" role="alert">
             The username must be between 3 and 20 characters.
           </div>
         );
       }
     };
     
     const vpassword = (value) => {
       if (value.length < 6 || value.length > 40) {
         return (
           <div className="alert alert-danger" role="alert">
             The password must be between 6 and 40 characters.
           </div>
         );
       }
     };
const Register = () => {
       const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
            Swal.fire({
                position: 'top',
                icon: 'success',
                color: 'white',
                background:'transparent',
                title: 'Prisiregistravote!',
                showConfirmButton: false,
                timer: 1500
              })
        navigate("/signin");
          setMessage(response.data.message);
          setSuccessful(true); 
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

    return ( 
        <header>
        <h1 className="title" style={{color:"white"}} >Registracija</h1>
        <Form onSubmit={handleRegister} ref={form}>
              {!successful && (

              
        <div className='layout'>
        <div>
        <label htmlFor="username" style={{color:'white',}}></label>
        <input type="text"
               placeholder='Vardas'
               name="username"
               className="inputs"
               value={username}
               onChange={onChangeUsername}
               validations={[required,vusername]}>
        </input>
        </div>
        <div>
        <label htmlFor="email" style={{color:'white',}}></label>
        <input type="email"
               placeholder='VardenisPavardenis@gmail.com'
               name="email"
               className="inputs"
               value={email}
               onChange={onChangeEmail}
               validations={[required,validEmail]}>
        </input>
        </div>
        <div>
        <label htmlFor="password" style={{color:'white',}}></label>
        <input type="password"
               placeholder='***********'
               name="password"
               value={password}
               onChange={onChangePassword}
               validations={[required,vpassword]}
               className="inputs">
        </input>
        <div style={{color:'white'}}>Jau turite vartotoja? <Link to="/signin" style={{color:'#33BDFF',textDecoration:'none'}}> Prisijungti.</Link></div>
        </div>
                <button id="log_btn">Registruotis</button>
        </div>
        )}
        <CheckButton style={{display:"none"}} ref={checkBtn}/>
        </Form>
        </header>
     );
}
export default Register;
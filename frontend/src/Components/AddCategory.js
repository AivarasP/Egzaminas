import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import authHeader from '../services/auth-header';
import './AddCategory.css'
const AddCategory = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const data = {
        name:name
    }
function Submit(e) {
    e.preventDefault();
    if(!name){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Kategorija negali būti tuščia'
            
          })
    }  else {
        Swal.fire(
            'Kategorija pridėta!',
            '',
            'success',
            axios.post('http://localhost:8080/api/category', data, { headers: authHeader() }).then(
            navigate('/home')
            )
          )

}
}
return (  
    <div className='Category'>
        <h1>Pridėti Kategorija</h1>
        <input value = {name} onChange={(e) => setName(e.target.value)} type="text" className="input" placeholder='Kategorija'/>
        <button onClick={Submit} id="category">Išsaugoti</button>
    </div>
)
    }

 
export default AddCategory;
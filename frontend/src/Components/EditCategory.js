import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import authHeader from '../services/auth-header';
import './AddCategory.css'
const EditCategory = () => {
    const [name,setName] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/category/${id}`,{ headers: authHeader() }).then((res)=>{
            setName(res.data.name)
        })
    },[])

    const data = {
        name:name
    }
    const{id} = useParams();
    
    function Update(e){
        e.preventDefault();
        if(!name){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Kategorija neatitinka formato'
                
              })
        }  else { 
            Swal.fire({
                title: 'Ar tikrai norite išsaugoti pakeitimus?',
                showDenyButton: true,
                confirmButtonText: 'Išsaugoti',
                denyButtonText: `Neišsaugoti`,
              }).then((result) => {
                if (result.isConfirmed) {
                axios.put(`http://localhost:8080/api/category/${id}`,data,{ headers: authHeader() }).then(navigate("/category"))
                  Swal.fire('Išsaugota!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Pakeitimai nebuvo išsaugoti', '', 'info')
                }
              })
    
        
    }
       
    }

    return ( 
        <div className='Category'>
            <h1>Redaguoti Kategorija</h1>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" required placeholder='Kategorija' className='input'/>
                <button onClick={Update} id="category">Išsaugoti</button>
        </div>
     );
}
 
export default EditCategory;
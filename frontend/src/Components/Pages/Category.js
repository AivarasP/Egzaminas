import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";
import './Category.css'
const Category = () => {
const [category, setCategory] = useState([]);
  const loadCategory = () => {
    axios.get("http://localhost:8080/api/category",{ headers: authHeader() }).then((res) => {
      setCategory(res.data.reverse());
    });
  };
  useEffect(() => {
    loadCategory();
  }, [category]);

  function Delete(id) {
    Swal.fire({
      title: 'Ar tikrai norite ištrinti?',
      text: "Sugražinti nebus galima.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Ne, atšaukti!",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Taip, ištrinti!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/category/${id}`,{ headers: authHeader() }).then(()=>loadCategory())
        Swal.fire(
          'Įrašas ištrintas!',
          '',
          'success'
        )
      }
    })
  }
    return ( 
        <div className="forma">
            <table>
        <tr>
              
              <th>
                Kategorija
              </th>
              <th>
                Veiksmai
              </th>
            </tr>
            <tbody>
            {category.map((categories, index) => (
              <tr key={index}>
                
                <td>
                  {categories.name}
                </td>
                <td >
                  <Link to={`/edit-category/${categories.id}`}>
                    <button id="category">
                    Redaguoti
                    </button>
                  </Link>
                  <button id="categorydelete"
                    onClick={() => Delete(categories.id)}>
                    Ištrinti
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
     );
}
 
export default Category;
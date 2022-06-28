import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";
import './Home.css'
function Home() {
    const [book,setBook] = useState([]);
    const loadBook = () => {
        axios.get("http://localhost:8080/api/category/${id}/book",{ headers: authHeader() }).then((res) => {
            setBook(res.data.reverse());
          });
    };
    useEffect(() => {
        loadBook();
      }, [book]);
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
            axios.delete(`http://localhost:8080/api/category/${id}/book`,{ headers: authHeader() }).then(()=>loadBook())
            Swal.fire(
              'Įrašas ištrintas!',
              '',
              'success'
            )
          }
        })
      }
    return (
    <div className="KnyguForma">
     <h1> Knygos </h1>
     <div>
        
        <table>
          <thead>
            <tr>
              
              <th scope="col">
                Pavadinimas
              </th>
              <th scope="col">
                 Aprašymas
              </th>
              <th scope="col">
                Nuotrauka
              </th>
              <th scope="col">
                IBSN
              </th>
              <th scope="col">
                Puslapių kiekis
              </th>
            </tr>
          </thead>
          <tbody>
            {book.map((books, index) => (
              <tr key={index}>
                <td>
                  {books.name}
                </td>
                <td>
                  {books.description}
                </td>
                <td>
                  {books.imagePath}
                </td>
                <td>
                  {books.isbn}
                </td>
                <td>
                  {books.pages}
                </td>
                <td>
                  <Link to={`/edit-book/${books.id}`}>
                    Redaguoti
                  </Link>
                  <button onClick={() => Delete(books.id)}>
                    Ištrinti
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}
export default Home;
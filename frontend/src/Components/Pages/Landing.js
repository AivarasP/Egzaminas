import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'

const Landing = () => {
    return ( 
        <div >
            <h1 className="title">Knygų Rezervacija</h1>
            <Link to="/signin">
                <button id="log_btn">Prisijungti</button>
            </Link>
            <Link to="/signup">
                <button id="log_btn">Registracija</button>
            </Link>
        </div>
     );
}
 
export default Landing;
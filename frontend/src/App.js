import './App.css';
import {Route,Routes,Navigate} from 'react-router-dom';
import { Fragment } from "react";
import Landing from './Components/Pages/Landing';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Home from './Components/Pages/Home'
import Navbar from './Components/Pages/Navbar';
import Category from './Components/Pages/Category';
import AddCategory from './Components/AddCategory';
import EditCategory from './Components/EditCategory';
function App() {
  const AuthRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.accessToken) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>} />
        <Route path="/home" element ={<AuthRoute><Fragment><Navbar/><Home/></Fragment></AuthRoute>} />
        <Route path="/category" element={<AuthRoute><Fragment><Navbar/><Category/></Fragment></AuthRoute>}/>
        <Route path="/add-category" element={<AuthRoute><Fragment><Navbar/><AddCategory/></Fragment></AuthRoute>} />
        <Route path="/edit-category/:id" element={<AuthRoute><Fragment><Navbar/><EditCategory/></Fragment></AuthRoute>} />
        <Route path="*" element ={<AuthRoute></AuthRoute>} />
      </Routes>
    </div>
  );
}

export default App;

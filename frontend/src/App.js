import './App.css';
import {Route,Routes,Navigate} from 'react-router-dom';
import Landing from './Components/Pages/Landing';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;

import Navbar from './components/NavBar'
import './App.css';

import { Link, Outlet } from "react-router-dom";
function App() {
  return (<>
    <Navbar/>
   
        
    <Outlet/>
    
    </>
  );
}

export default App;
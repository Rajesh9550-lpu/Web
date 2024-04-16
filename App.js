import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
import NavigationBar from './NavigationBar';
import Personal from './Personal';
import Educational from './Educational';
import Professional from './Professional';
import Documents from './Documents';
import NavigationBarSA from './NavigationBarSA';
import SAHome from './SAHome';

function App() {
  return (
    <div>
     
    <BrowserRouter>

      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={< Signup/>} />
      <Route path="/home" element={< Home/>} />  
      <Route path="/personal" element={< Personal/>} />  
      <Route path="/educational" element={< Educational/>} />  
      <Route path="/professional" element={< Professional/>} />  
      <Route path="/documents" element={< Documents/>} />  
      <Route path="/sahome" element={<SAHome/>}/>


      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

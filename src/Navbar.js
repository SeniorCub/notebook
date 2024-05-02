import logo from './logo.svg';
import './App.css'


function Navbar ()  {
     return ( 
          <header className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
               <div className="brand">NoteBook</div>
          </header>
     );
}
 
export default Navbar;
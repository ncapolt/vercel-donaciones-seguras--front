import './NavBar.css';
import logo from '../Images/Logo.png';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo Donaciones Seguras" className="navbar-logo" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
      <div className="navbar-right">
        <a href="#sobre-nosotros" className="navbar-link">Sobre nosotros</a>
        <a href="#contacto" className="navbar-link">Contacto</a>
        <a href="#registrate" className="navbar-link navbar-cta">Registrate</a>
      </div>
    </nav>
  );
}

export default NavBar;


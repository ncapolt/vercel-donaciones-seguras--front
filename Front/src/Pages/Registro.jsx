import { useNavigate } from 'react-router-dom';
import logo from '../Images/Logo.png';
import './Registro.css';

function Registro() {
  const navigate = useNavigate();

  const handleOrganizadorClick = () => {
    navigate('/elija-opcion');
  };

  const handleAfectadoClick = () => {
    navigate('/signin-afectado');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="registro-container">
      {/* Header con logo */}
      <div className="registro-header">
        <div className="registro-logo">
          <img src={logo} alt="Logo Donaciones Seguras" className="registro-logo-img" />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="registro-content">
        <h1 className="registro-title">Registro</h1>
        <p className="registro-subtitle">Primero necesitamos saber qué sos</p>
        
        {/* Botones de opción */}
        <div className="registro-buttons">
          <button 
            className="registro-btn organizador-btn" 
            onClick={handleOrganizadorClick}
          >
            Organizador
          </button>
          <button 
            className="registro-btn afectado-btn" 
            onClick={handleAfectadoClick}
          >
            Afectado
          </button>
        </div>

        {/* Enlace de login */}
        <div className="registro-login-link">
          <span className="login-text">Ya tiene cuenta? </span>
          <button className="login-link" onClick={handleLoginClick}>
            Ingresar.
          </button>
        </div>
      </div>

      {/* Botón de retroceso */}
      <button className="registro-back-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default Registro;

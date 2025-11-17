import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './ElijaOpcion.css';

const ElijaOpcion = () => {
  const navigate = useNavigate();

  const handleOrganizadorClick = () => {
    // Aquí podrías navegar a un formulario de registro para organizadores
    navigate('/signin-organizador');
  };

  const handleAyudanteClick = () => {
    // Aquí podrías navegar a un formulario de registro para ayudantes
    navigate('/signin-ayudante');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <NavBar showAvatar={false} />
      <div className="body-content">
        <div className="elija-opcion-container">
          {/* Contenido principal */}
          <div className="elija-opcion-content">
            <h1 className="elija-opcion-title">Elegí la opción correcta</h1>
            
            <p className="elija-opcion-description">
              En caso de ser propietario de una ONG, elegí la opción "Organizador". 
              Si colaboras con una ya registrada en la página, elegí la opción "Ayudante".
            </p>

            {/* Botones de opción */}
            <div className="elija-opcion-buttons">
              <button 
                className="elija-opcion-btn organizador-btn" 
                onClick={handleOrganizadorClick}
              >
                Organizador
              </button>
              <button 
                className="elija-opcion-btn ayudante-btn" 
                onClick={handleAyudanteClick}
              >
                Ayudante
              </button>
            </div>

            {/* Botón de iniciar sesión */}
            <div className="elija-opcion-login-section">
              <button 
                className="elija-opcion-login-btn" 
                onClick={handleLoginClick}
              >
                Ya estoy registrado, iniciar sesión
              </button>
            </div>
          </div>

          {/* Botón de retroceso */}
          <button className="back-button" onClick={handleBackClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ElijaOpcion;

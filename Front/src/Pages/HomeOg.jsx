import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './HomeOg.css';

function HomeOg() {
  const [userName, setUserName] = useState('');
  const [userCampaigns, setUserCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener información del usuario desde localStorage si está disponible
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const userData = JSON.parse(usuario);
      setUserName(userData.nombre);
    } else {
      // Si no hay usuario logueado, usar datos por defecto
      setUserName('Usuario');
    }

    // Obtener campañas con manejo de errores
    fetch('http://localhost:3000/api/campaigns')
      .then(res => res.json())
      .then(data => setUserCampaigns(data))
      .catch(error => {
        console.error('Error al cargar campañas:', error);
        // Datos de ejemplo si la API falla
        setUserCampaigns([
          { id: 1, nombre: "#TodosXBahía" },
          { id: 2, nombre: "Abrigo para el alma" }
        ]);
      });
  }, []);

  const handleChooseCampaign = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <>
      <NavBar />
      <div className="body-content">
        <div className="welcome-section">
          <h1 className="welcome-greeting">Hola, {userName}!</h1>
          <p className="welcome-subtitle">Necesitas ayuda? Estas campañas te podrían servir!</p>
          <div className="campaigns-container">
            {userCampaigns.map((campaign, index) => (
              <div
                key={campaign.id}
                className="campaign-row"
                onClick={() => handleChooseCampaign(campaign.id)}
              >
                <div className="campaign-info">
                  <span className="campaign-name">{campaign.nombre}</span>
                </div>
                <div className="choose-indicator">
                  Elegir
                </div>
                {index < userCampaigns.length - 1 && <div className="campaign-separator"></div>}
              </div>
            ))}
          </div>
          <button className="new-campaign-btn lower" onClick={() => navigate('/nueva-campana')}>
            Nueva Campaña
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeOg;

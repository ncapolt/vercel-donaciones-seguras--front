import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './HomeAf.css';


function HomeAf() {
  const [userName, setUserName] = useState('');
  const [userCampaigns, setUserCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está logueado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Obtener información del usuario desde localStorage
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const userData = JSON.parse(usuario);
      setUserName(userData.nombre);
    }

    // Obtener campañas (puedes mantener esta lógica o cambiarla según necesites)
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
  }, [navigate]);

  const handleChooseCampaign = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <>
      <NavBar />
      <div className="body-content-af">
        <div className="welcome-section-af">
          <h1 className="welcome-greeting-af">Hola, {userName}!</h1>
          <p className="welcome-subtitle-af">Necesitas ayuda? Estas campañas te podrían servir!</p>
          <div className="campaigns-container-af">
            {userCampaigns.map((campaign, index) => (
              <div
                key={campaign.id}
                className="campaign-row-af"
                onClick={() => handleChooseCampaign(campaign.id)}
              >
                <div className="campaign-info-af">
                  <span className="campaign-name-af">{campaign.nombre}</span>
                </div>
                <div className="choose-indicator-af">
                  Elegir
                </div>
                {index < userCampaigns.length - 1 && <div className="campaign-separator-af"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAf;
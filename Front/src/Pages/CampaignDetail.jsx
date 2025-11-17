import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './CampaignDetail.css';

function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`http://localhost:3000/api/campaigns/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar la campaña');
        return res.json();
      })
      .then(data => {
        if (isMounted) setCampaign(data);
      })
      .catch(err => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [id]);

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="campaign-detail-container">
          <p>Cargando campaña...</p>
        </div>
      </>
    );
  }

  if (error || !campaign) {
    return (
      <>
        <NavBar />
        <div className="campaign-detail-container">
          <p>Error: {error || 'Campaña no encontrada'}</p>
          <button className="primary-btn" onClick={handleBack}>Volver</button>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="campaign-detail-container">
        <h1 className="campaign-title">Sobre <em>{campaign.nombre}</em></h1>
        <p className="campaign-text">
          {campaign.motivo}
        </p>
        <div className="campaign-meta">
          <span>{campaign.localidad}, {campaign.provincia}</span>
        </div>
        <button className="primary-btn" onClick={() => navigate(`/campaign/${id}/products`)}>Vamos!</button>
        <button className="back-btn" onClick={handleBack} aria-label="Volver" title="Volver">◀</button>
      </div>
    </>
  );
}

export default CampaignDetail;



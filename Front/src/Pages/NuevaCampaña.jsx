import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './NuevaCampaña.css';

function NuevaCampaña() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre || !localidad || !provincia || !motivo) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          localidad,
          provincia,
          motivo
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Campaña creada exitosamente!');
        // Limpiar el formulario
        setNombre('');
        setLocalidad('');
        setProvincia('');
        setMotivo('');
        // Redirigir a la página de campañas del organizador
        navigate('/homeog');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Verifica que el servidor esté funcionando.');
    }
  };

  return (
    <div className="nueva-campania-bg">
      <NavBar />
      <form className="nueva-campania-form" onSubmit={handleSubmit}>
        <h1 className="nueva-campania-title">Nueva Campaña</h1>
        <label className="nueva-campania-label">Nombre:
          <input
            className="nueva-campania-input"
            type="text"
            placeholder="Ingrese nombre aquí..."
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </label>
        <div className="nueva-campania-row">
          <label className="nueva-campania-label">Localidad:
            <input
              className="nueva-campania-input"
              type="text"
              placeholder="Ingrese localidad aquí..."
              value={localidad}
              onChange={e => setLocalidad(e.target.value)}
            />
          </label>
          <label className="nueva-campania-label">Provincia:
            <select
              className="nueva-campania-select"
              value={provincia}
              onChange={e => setProvincia(e.target.value)}
            >
              <option value="">Elegir</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Santa Fe">Santa Fe</option>
              {/* Agrega más provincias si quieres */}
            </select>
          </label>
        </div>
        <label className="nueva-campania-label">Motivo:
          <input
            className="nueva-campania-input"
            type="text"
            placeholder="Ingrese motivo aquí..."
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
          />
        </label>
        <button className="nueva-campania-btn" type="submit">
          <span className="nueva-campania-btn-icon">+</span>Agregar
        </button>
        {/* Botón de retroceso */}
        <button type="button" className="nueva-campania-back" onClick={() => navigate('/homeog')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default NuevaCampaña;
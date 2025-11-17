import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './RecuperarContraseña.css';

const RecuperarContraseña = () => {
  const [formData, setFormData] = useState({
    contraseñaVieja: '',
    contraseñaNueva: '',
    confirmarContraseña: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (formData.contraseñaNueva !== formData.confirmarContraseña) {
      setError('Las contraseñas nuevas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.contraseñaNueva.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      // Obtener información del usuario logueado
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (!usuario) {
        setError('No hay usuario logueado');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3000/api/cambiar-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: usuario.id,
          contraseñaVieja: formData.contraseñaVieja,
          contraseñaNueva: formData.contraseñaNueva
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Contraseña cambiada exitosamente
        alert('Contraseña cambiada exitosamente');
        navigate(-1); // Volver a la página anterior
      } else {
        setError(data.error || 'Error al cambiar la contraseña');
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <NavBar />
      <div className="body-content">
        <div className="recuperar-container">
          {/* Contenido principal */}
          <div className="recuperar-content">
        <h1 className="recuperar-title">Cambiar Contraseña</h1>
        
        <form onSubmit={handleSubmit} className="recuperar-form">
          <div className="form-group">
            <label htmlFor="contraseñaVieja">Contraseña vieja:</label>
            <input
              type="password"
              id="contraseñaVieja"
              name="contraseñaVieja"
              value={formData.contraseñaVieja}
              onChange={handleChange}
              placeholder="Ingrese su vieja contraseña aquí..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseñaNueva">Contraseña nueva:</label>
            <input
              type="password"
              id="contraseñaNueva"
              name="contraseñaNueva"
              value={formData.contraseñaNueva}
              onChange={handleChange}
              placeholder="Ingrese su contraseña aquí..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarContraseña">Confirmar nueva contraseña:</label>
            <input
              type="password"
              id="confirmarContraseña"
              name="confirmarContraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              placeholder="Ingrese su contraseña aquí..."
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="confirmar-button" disabled={loading}>
            {loading ? 'Cambiando contraseña...' : 'Confirmar'}
          </button>
        </form>
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

export default RecuperarContraseña;

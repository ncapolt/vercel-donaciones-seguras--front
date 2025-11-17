import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    localidad: '',
    provincia: ''
  });

  useEffect(() => {
    // Verificar si el usuario está logueado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Obtener datos del usuario desde localStorage
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const user = JSON.parse(usuario);
      console.log('Cargando datos del usuario:', user);
      setUserData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.email || user.mail || '', // Compatibilidad con ambos campos
        localidad: user.localidad || '',
        provincia: user.provincia || ''
      });
    } else {
      alert('Error: No se encontraron datos de usuario. Por favor, inicia sesión nuevamente.');
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Obtener el ID del usuario desde localStorage
      const usuarioString = localStorage.getItem('usuario');
      console.log('Usuario desde localStorage:', usuarioString);
      
      if (!usuarioString) {
        alert('Error: No estás logueado. Por favor, inicia sesión primero.');
        navigate('/login');
        return;
      }
      
      const usuario = JSON.parse(usuarioString);
      console.log('Usuario parseado:', usuario);
      
      if (!usuario || !usuario.id) {
        alert('Error: Información de usuario incompleta. Por favor, inicia sesión nuevamente.');
        navigate('/login');
        return;
      }

      // Enviar datos al backend
      const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar localStorage con los datos actualizados del servidor
        const updatedUser = { ...usuario, ...data.usuario };
        localStorage.setItem('usuario', JSON.stringify(updatedUser));
        
        alert('Cambios guardados exitosamente en la base de datos');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error de conexión. Verifica que el servidor esté funcionando.');
    }
  };

  const handleChangePassword = () => {
    navigate('/recuperar');
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <h1 className="user-title">User</h1>
        <div className="user-banner">
          <span className="banner-text">DONACIONES SEGURAS</span>
          <span className="banner-heart">❤️</span>
        </div>
      </div>

      <div className="user-content">
        <h2 className="user-subtitle">Datos Personales</h2>
        
        <div className="user-form">
          <div className="form-column">
            <div className="form-group">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                className="form-input"
                placeholder="*Nombre registrado*"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mail:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="*Mail registrado*"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Localidad:</label>
              <input
                type="text"
                name="localidad"
                value={userData.localidad}
                onChange={handleInputChange}
                className="form-input"
                placeholder="*Localidad registrada*"
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label className="form-label">Apellido(s):</label>
              <input
                type="text"
                name="apellido"
                value={userData.apellido}
                onChange={handleInputChange}
                className="form-input"
                placeholder="*Apellido registrado*"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Provincia:</label>
              <select
                name="provincia"
                value={userData.provincia}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Elegir</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="CABA">CABA</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Tucumán">Tucumán</option>
                <option value="Salta">Salta</option>
                <option value="Chaco">Chaco</option>
                <option value="Corrientes">Corrientes</option>
                <option value="Entre Ríos">Entre Ríos</option>
                <option value="Misiones">Misiones</option>
                <option value="San Juan">San Juan</option>
                <option value="San Luis">San Luis</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Catamarca">Catamarca</option>
                <option value="Santiago del Estero">Santiago del Estero</option>
                <option value="Formosa">Formosa</option>
                <option value="Neuquén">Neuquén</option>
                <option value="Río Negro">Río Negro</option>
                <option value="Chubut">Chubut</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Tierra del Fuego">Tierra del Fuego</option>
                <option value="La Pampa">La Pampa</option>
              </select>
            </div>
          </div>
        </div>

        <div className="user-actions">
          {/* Botón de retroceso */}
          <button className="back-button" onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="action-buttons">
            <button className="save-button" onClick={handleSaveChanges}>
              Guardar Cambios
            </button>
            <button className="change-password-button" onClick={handleChangePassword}>
              Cambiar contra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

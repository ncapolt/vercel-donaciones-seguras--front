import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './SignInAfectado.css';

const SignInAfectado = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    contraseña: '',
    localidad: '',
    provincia: ''
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

    // Validaciones básicas
    if (!formData.nombre || !formData.apellido || !formData.mail || !formData.contraseña || !formData.localidad || !formData.provincia) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    // Validación de contraseña
    if (formData.contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.mail, // Cambiar 'mail' por 'email' para que coincida con el backend
          contraseña: formData.contraseña,
          localidad: formData.localidad,
          provincia: formData.provincia,
          tipo_usuario_id: 1 // Tipo afectado
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Usuario registrado exitosamente, redirigir al login
        alert('Usuario registrado exitosamente. Por favor inicia sesión.');
        navigate('/login');
      } else {
        setError(data.error || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
      <NavBar showAvatar={false} />
      <div className="body-content">
        <div className="signin-afectado-container">
          {/* Contenido principal */}
          <div className="signin-afectado-content">
            <h1 className="signin-afectado-title">Datos Personales</h1>
            
            <form onSubmit={handleSubmit} className="signin-afectado-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ingrese su nombre aquí..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apellido">Apellido(s):</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Ingrese su(s) apellido(s) aquí..."
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="mail">Mail:</label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  placeholder="Ingrese su mail aquí..."
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="contraseña">Contraseña:</label>
                <input
                  type="password"
                  id="contraseña"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  placeholder="Ingrese su contraseña aquí..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="localidad">Localidad:</label>
                  <input
                    type="text"
                    id="localidad"
                    name="localidad"
                    value={formData.localidad}
                    onChange={handleChange}
                    placeholder="Ingrese localidad aquí..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="provincia">Provincia:</label>
                  <select
                    id="provincia"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleChange}
                    required
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

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="continuar-button" disabled={loading}>
                {loading ? 'Registrando...' : 'Continuar'}
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

export default SignInAfectado;

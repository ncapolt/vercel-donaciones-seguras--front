import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrNombre: '',
    contraseña: ''
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

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar información del usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirigir según el tipo de usuario
        if (data.usuario.tipo_usuario_id === 1) {
          navigate('/homeaf'); // Usuario afiliado
        } else {
          navigate('/homeog'); // Usuario organizador
        }
      } else {
        setError(data.error || 'Error en el login');
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!formData.emailOrNombre) {
      setError('Por favor ingrese su email o nombre primero');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Validar que el usuario existe
      const response = await fetch('http://localhost:3000/api/validar-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrNombre: formData.emailOrNombre
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar la información del usuario temporalmente para la pantalla de recuperar
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        navigate('/recuperar');
      } else {
        setError(data.error || 'Usuario no encontrado');
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar showAvatar={false} />
      <div className="body-content">
        <div className="login-container">
          {/* Contenido principal */}
          <div className="login-content">
        <h1 className="login-title">LOG IN</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="emailOrNombre">Mail/Nombre:</label>
            <input
              type="text"
              id="emailOrNombre"
              name="emailOrNombre"
              value={formData.emailOrNombre}
              onChange={handleChange}
              placeholder="Ingrese su mail o nombre aquí..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">PassWord:</label>
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

          {error && <div className="error-message">{error}</div>}

          <div className="form-links">
            <a href="/" className="link">No tiene cuenta? Regístrese.</a>
            <a href="#" onClick={handleForgotPassword} className="link">Me he olvidado mi contraseña.</a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Log In'} 
          </button>
        </form>
          </div>

          {/* Botón de retroceso */}
          <button className="back-button" onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;


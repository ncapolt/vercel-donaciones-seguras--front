import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './SignInAyudante.css';

const provincias = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
  'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
  'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
  'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego',
  'Tucumán'
];

function SignInAyudante() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    localidad: '',
    provincia: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.nombre || !formData.apellido || !formData.email || !formData.contraseña || !formData.localidad || !formData.provincia) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Ingresá un email válido');
      setLoading(false);
      return;
    }

    // Validación de contraseña
    if (formData.contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Crear el ayudante como usuario tipo 1 (Afectado/Ayudante)
      const userData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        localidad: formData.localidad,
        provincia: formData.provincia,
        contraseña: formData.contraseña,
        tipo_usuario_id: 1 // Tipo Afectado/Ayudante
      };

      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al registrar usuario');
      }

      alert('Usuario registrado exitosamente. Por favor inicia sesión.');
      navigate('/login');
      
    } catch (err) {
      setError(err.message || 'Error de conexión. Verifica que el servidor esté funcionando.');
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
      <NavBar showAvatar={false} />
      <div className="signin-ayudante-container">
        <div className="signin-ayudante-content">
          <h1 className="signin-ayudante-title">Datos Personales</h1>

          <form className="signin-ayudante-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingrese su texto aquí..."
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido:</label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  placeholder="Ingrese su texto aquí..."
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Mail:</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su mail aquí..."
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                id="contraseña"
                name="contraseña"
                type="password"
                placeholder="Ingrese su contraseña aquí..."
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="localidad">Localidad:</label>
                <input
                  id="localidad"
                  name="localidad"
                  type="text"
                  placeholder="Ingrese localidad aquí..."
                  value={formData.localidad}
                  onChange={handleChange}
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
                  {provincias.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="continuar-button" disabled={loading}>
              {loading ? 'Guardando...' : 'Continuar'}
            </button>
          </form>
        </div>

        <button className="back-button" onClick={handleBackClick} aria-label="Volver">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </>
  );
}

export default SignInAyudante;



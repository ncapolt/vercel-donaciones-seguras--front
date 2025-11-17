import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './NuevoDestino.css';

function EditarDestino() {
  const { destinoId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    localidad: '',
    provincia: '',
    telefono: '',
    horario_atencion: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadDestino() {
      try {
        setLoadingData(true);
        const response = await fetch(`http://localhost:3000/api/destinos/${destinoId}`);
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el destino');
        }

        const result = await response.json();
        if (isMounted && result.destino) {
          setFormData({
            nombre: result.destino.nombre || '',
            direccion: result.destino.direccion || '',
            localidad: result.destino.localidad || '',
            provincia: result.destino.provincia || '',
            telefono: result.destino.telefono || '',
            horario_atencion: result.destino.horario_atencion || ''
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error al cargar el destino');
        }
      } finally {
        if (isMounted) setLoadingData(false);
      }
    }

    if (destinoId) {
      loadDestino();
    }
    return () => { isMounted = false; };
  }, [destinoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre || !formData.direccion) {
      setError('Por favor completa los campos requeridos (Nombre y Dirección)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/destinos/${destinoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al actualizar el destino');
      }

      alert('Destino actualizado exitosamente');
      navigate('/punto-recoleccion');
    } catch (err) {
      setError(err.message || 'Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const navbarLinks = [
    { label: 'Punto de recolección', href: '/punto-recoleccion' },
    { label: 'Campañas', href: '/homeog' }
  ];

  if (loadingData) {
    return (
      <>
        <NavBar links={navbarLinks} />
        <div className="nuevo-destino-container">
          <div className="nuevo-destino-content">
            <p>Cargando destino...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar links={navbarLinks} />
      <div className="nuevo-destino-container">
        <div className="nuevo-destino-content">
          <h1 className="nuevo-destino-title">Editar Destino</h1>

          <form className="nuevo-destino-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ingrese nombre aquí..."
                value={formData.nombre}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="direccion">Dirección:</label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                placeholder="Ingrese dirección aquí..."
                value={formData.direccion}
                onChange={handleChange}
                required
                disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="provincia">Provincia:</label>
                <select
                  id="provincia"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Elegir</option>
                  <option value="Buenos Aires">Buenos Aires</option>
                  <option value="Córdoba">Córdoba</option>
                  <option value="Santa Fe">Santa Fe</option>
                  <option value="Mendoza">Mendoza</option>
                  <option value="Tucumán">Tucumán</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="text"
                  placeholder="Ingrese teléfono aquí..."
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="horario_atencion">Horario de atención:</label>
                <input
                  id="horario_atencion"
                  name="horario_atencion"
                  type="text"
                  placeholder="Ej: Lunes a Viernes 9:00-18:00"
                  value={formData.horario_atencion}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="agregar-button" disabled={loading || loadingData}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        </div>

        <button className="back-button" onClick={() => navigate(-1)} aria-label="Volver">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </>
  );
}

export default EditarDestino;


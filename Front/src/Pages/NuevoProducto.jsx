import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './NuevoProducto.css';

const tiposProducto = ['Ropa', 'Limpieza', 'Alimentos', 'Medicamentos', 'Juguetes', 'Electrónica', 'Muebles', 'Calzado', 'Higiene Personal'];
const estados = [
  { value: 'N', label: 'Nuevo' },
  { value: 'U', label: 'Usado' }
];

function NuevoProducto() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_producto_id: '',
    estado: '',
    destino: '',
    nota: ''
  });
  const [tipos, setTipos] = useState(tiposProducto.map((nombre, idx) => ({ id: idx + 1, nombre })));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTipos, setLoadingTipos] = useState(false);

  // Cargar tipos de producto desde la API
  useEffect(() => {
    let cancelled = false;
    
    async function loadTipos() {
      try {
        setLoadingTipos(true);
        const res = await fetch('http://localhost:3000/api/tipos-producto');
        
        if (cancelled) return;
        
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && !cancelled) {
            setTipos(data);
          }
        }
      } catch (err) {
        console.error('Error cargando tipos:', err);
        // Ya tenemos los tipos por defecto, así que no hacemos nada
      } finally {
        if (!cancelled) {
          setLoadingTipos(false);
        }
      }
    }
    
    loadTipos();
    
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.nombre || !formData.tipo_producto_id || !formData.estado || !formData.destino) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    if (!campaignId) {
      setError('ID de campaña no válido');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          tipo_producto_id: parseInt(formData.tipo_producto_id),
          estado: formData.estado,
          destino: formData.destino,
          nota: formData.nota || null,
          campaign_id: parseInt(campaignId)
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear el producto');
      }

      alert('Producto agregado exitosamente');
      navigate(`/campaign/${campaignId}/products`);
      
    } catch (err) {
      setError(err.message || 'Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!campaignId) {
    return (
      <>
        <NavBar />
        <div className="nuevo-producto-container">
          <div className="nuevo-producto-content">
            <h1 className="nuevo-producto-title">Error</h1>
            <p>ID de campaña no válido</p>
            <button onClick={() => navigate(-1)}>Volver</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="nuevo-producto-container">
        <div className="nuevo-producto-content">
          <h1 className="nuevo-producto-title">Nuevo Producto</h1>

          <form className="nuevo-producto-form" onSubmit={handleSubmit}>
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
              <label htmlFor="tipo_producto_id">Tipo:</label>
              <select
                id="tipo_producto_id"
                name="tipo_producto_id"
                value={formData.tipo_producto_id}
                onChange={handleChange}
                required
                disabled={loading || loadingTipos}
              >
                <option value="">Elegir</option>
                {tipos.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado:</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Elegir</option>
                {estados.map(est => (
                  <option key={est.value} value={est.value}>
                    {est.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="destino">Destino:</label>
              <select
                id="destino"
                name="destino"
                value={formData.destino}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Elegir</option>
                <option value="Comunidad">Comunidad</option>
                <option value="Familia">Familia</option>
                <option value="Individuo">Individuo</option>
                <option value="Centro de distribución">Centro de distribución</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nota">Observaciones:</label>
              <input
                id="nota"
                name="nota"
                type="text"
                placeholder="Ingrese su texto aquí..."
                value={formData.nota}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="agregar-button" disabled={loading || loadingTipos}>
              {loading ? 'Agregando...' : '+ Agregar'}
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

export default NuevoProducto;

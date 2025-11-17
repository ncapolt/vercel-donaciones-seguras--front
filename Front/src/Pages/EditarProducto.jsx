import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './EditarProducto.css';

const tiposProducto = ['Ropa', 'Limpieza', 'Alimentos', 'Medicamentos', 'Juguetes', 'Electrónica', 'Muebles', 'Calzado', 'Higiene Personal'];
const estados = [
  { value: 'N', label: 'Nuevo' },
  { value: 'U', label: 'Usado' }
];
const estadosProducto = [
  { value: 'libre', label: 'Libre' },
  { value: 'reservado', label: 'Reservado' },
  { value: 'en_camino', label: 'En Camino' },
  { value: 'en_destino', label: 'En Destino' },
  { value: 'entregado', label: 'Entregado' }
];

function EditarProducto() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_producto_id: '',
    estado: '',
    estado_producto: '',
    destino: '',
    condicion: '',
    nota: ''
  });
  const [tipos, setTipos] = useState(tiposProducto.map((nombre, idx) => ({ id: idx + 1, nombre })));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Cargar datos del producto y tipos
  useEffect(() => {
    let cancelled = false;
    
    async function loadData() {
      try {
        setLoadingData(true);
        
        // Cargar tipos de producto
        try {
          const tiposRes = await fetch('http://localhost:3000/api/tipos-producto');
          if (tiposRes.ok) {
            const tiposData = await tiposRes.json();
            if (Array.isArray(tiposData) && tiposData.length > 0 && !cancelled) {
              setTipos(tiposData);
            }
          }
        } catch (err) {
          console.error('Error cargando tipos:', err);
        }
        
        // Cargar datos del producto
        const productRes = await fetch(`http://localhost:3000/api/productos/${productId}`);
        if (!productRes.ok) throw new Error('No se pudo cargar el producto');
        
        const product = await productRes.json();
        if (!cancelled) {
          setFormData({
            nombre: product.nombre || '',
            tipo_producto_id: product.tipo_producto_id || '',
            estado: product.estado || '',
            estado_producto: product.estado_producto || 'libre',
            destino: product.destino || '',
            condicion: product.estado || '',
            nota: product.nota || ''
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Error al cargar el producto');
          console.error('Error:', err);
        }
      } finally {
        if (!cancelled) {
          setLoadingData(false);
        }
      }
    }
    
    if (productId) {
      loadData();
    }
    
    return () => {
      cancelled = true;
    };
  }, [productId]);

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
    
    if (!formData.nombre || !formData.tipo_producto_id || !formData.estado || !formData.estado_producto || !formData.destino) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/productos/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          tipo_producto_id: parseInt(formData.tipo_producto_id),
          estado: formData.estado,
          estado_producto: formData.estado_producto,
          destino: formData.destino,
          nota: formData.nota || null
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al actualizar el producto');
      }

      alert('Producto actualizado exitosamente');
      // Volver a la página de productos de la campaña
      const campaignId = result.producto?.campaign_id;
      if (campaignId) {
        navigate(`/campaign/${campaignId}/products`);
      } else {
        navigate(-1);
      }
      
    } catch (err) {
      setError(err.message || 'Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <>
        <NavBar />
        <div className="editar-producto-container">
          <div className="editar-producto-content">
            <p>Cargando producto...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="editar-producto-container">
        <div className="editar-producto-content">
          <h1 className="editar-producto-title">Editar Producto</h1>

          <form className="editar-producto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="*Nombre Registrado*"
                value={formData.nombre}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-row-4">
              <div className="form-group">
                <label htmlFor="tipo_producto_id">Tipo:</label>
                <select
                  id="tipo_producto_id"
                  name="tipo_producto_id"
                  value={formData.tipo_producto_id}
                  onChange={handleChange}
                  required
                  disabled={loading || loadingData}
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
                <label htmlFor="estado_producto">Estado:</label>
                <select
                  id="estado_producto"
                  name="estado_producto"
                  value={formData.estado_producto}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="">Elegir</option>
                  {estadosProducto.map(est => (
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
                <label htmlFor="estado">Condición:</label>
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
            </div>

            <div className="form-group">
              <label htmlFor="nota">Observaciones:</label>
              <input
                id="nota"
                name="nota"
                type="text"
                placeholder="*Obs Registradas*"
                value={formData.nota}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="guardar-button" disabled={loading || loadingData}>
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

export default EditarProducto;


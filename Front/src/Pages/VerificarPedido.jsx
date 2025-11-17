import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './VerificarPedido.css';

function VerificarPedido() {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [productos, setProductos] = useState([]);
  const [checkedProductos, setCheckedProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadPedido() {
      try {
        setLoading(true);
        setError('');

        // Cargar información del pedido y productos
        const [pedidoRes, productosRes] = await Promise.all([
          fetch(`http://localhost:3000/api/pedidos/${pedidoId}`).catch(() => null),
          fetch(`http://localhost:3000/api/pedidos/${pedidoId}/productos`)
        ]);

        if (!productosRes.ok) {
          throw new Error('No se pudieron cargar los productos del pedido');
        }

        const productosData = await productosRes.json();
        if (isMounted) {
          setProductos(productosData.productos || []);
          // Inicializar todos los productos como checked
          setCheckedProductos((productosData.productos || []).map(p => p.id));
        }

        if (pedidoRes && pedidoRes.ok) {
          const pedidoData = await pedidoRes.json();
          if (isMounted) {
            setPedido(pedidoData.pedido);
          }
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message || 'Error al cargar el pedido');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (pedidoId) {
      loadPedido();
    }
    return () => { isMounted = false; };
  }, [pedidoId]);

  const handleCheckboxChange = (productoId) => {
    setCheckedProductos(prev => {
      if (prev.includes(productoId)) {
        return prev.filter(id => id !== productoId);
      } else {
        return [...prev, productoId];
      }
    });
  };

  const handleSelectAll = () => {
    if (checkedProductos.length === productos.length) {
      setCheckedProductos([]);
    } else {
      setCheckedProductos(productos.map(p => p.id));
    }
  };

  const handleConfirmarEntrega = async () => {
    if (checkedProductos.length === 0) {
      setError('Por favor verifica al menos un producto antes de confirmar la entrega');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:3000/api/pedidos/${pedidoId}/entregar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          producto_ids: checkedProductos
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al confirmar la entrega');
      }

      setSuccess('Pedido entregado exitosamente');
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate(`/campaign/${pedido?.campaign_id}/products`);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error de conexión. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  };

  const condicionLabels = {
    'N': 'Nuevo',
    'U': 'Usado'
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="verificar-pedido-container">
          <div className="loading">Cargando pedido...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="verificar-pedido-container">
        <h1 className="verificar-pedido-title">Verificar Pedido</h1>

        {pedido && (
          <div className="pedido-info">
            <p><strong>Código de reserva:</strong> {pedido.codigo_reserva}</p>
            <p><strong>Campaña:</strong> {pedido.campaign_nombre || 'N/A'}</p>
            <p><strong>Beneficiario:</strong> {pedido.usuario_nombre} {pedido.usuario_apellido}</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="success-message">
            <p>{success}</p>
          </div>
        )}

        {productos.length === 0 ? (
          <div className="empty-message">
            <p>No hay productos en este pedido.</p>
          </div>
        ) : (
          <>
            <div className="products-verification">
              <div className="select-all-container">
                <label className="select-all-label">
                  <input
                    type="checkbox"
                    checked={checkedProductos.length === productos.length && productos.length > 0}
                    onChange={handleSelectAll}
                    disabled={saving}
                  />
                  <span>Verificar todos ({checkedProductos.length} de {productos.length})</span>
                </label>
              </div>

              <div className="products-table">
                <div className="table-row table-header">
                  <div className="col checkbox-col">✓</div>
                  <div className="col producto">Producto</div>
                  <div className="col destino">Destino</div>
                  <div className="col condicion">Condición</div>
                </div>
                {productos.map((p, idx) => {
                  const condicionLabel = condicionLabels[p.estado] || p.estado || 'Nuevo';
                  
                  return (
                    <div key={p.id} className={`table-row ${idx % 2 === 0 ? 'row-even' : 'row-odd'}`}>
                      <div className="col checkbox-col">
                        <input
                          type="checkbox"
                          checked={checkedProductos.includes(p.id)}
                          onChange={() => handleCheckboxChange(p.id)}
                          disabled={saving}
                        />
                      </div>
                      <div className="col producto">
                        <span className="product-name">{p.nombre}</span>
                      </div>
                      <div className="col destino">
                        <span className="truncate">{p.destino || 'Comunidad...'}</span>
                      </div>
                      <div className="col condicion">
                        <span>{condicionLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="actions-container">
              <button
                className="confirm-button"
                onClick={handleConfirmarEntrega}
                disabled={saving || checkedProductos.length === 0}
              >
                {saving ? 'Confirmando...' : 'Confirmar Entrega'}
              </button>
              <button
                className="cancel-button"
                onClick={() => navigate(-1)}
                disabled={saving}
              >
                Cancelar
              </button>
            </div>
          </>
        )}

        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Volver">
          ◀
        </button>
      </div>
    </>
  );
}

export default VerificarPedido;



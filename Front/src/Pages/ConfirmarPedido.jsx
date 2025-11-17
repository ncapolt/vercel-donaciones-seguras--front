import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './ConfirmarPedido.css';

function ConfirmarPedido() {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadPedido() {
      try {
        setLoading(true);
        setError('');

        const [pedidoRes, productosRes] = await Promise.all([
          fetch(`http://localhost:3000/api/pedidos/${pedidoId}`),
          fetch(`http://localhost:3000/api/pedidos/${pedidoId}/productos`)
        ]);

        if (!pedidoRes.ok || !productosRes.ok) {
          throw new Error('No se pudo cargar la información del pedido');
        }

        const pedidoData = await pedidoRes.json();
        const productosData = await productosRes.json();

        if (isMounted) {
          setPedido(pedidoData.pedido);
          setProductos(productosData.productos || []);
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

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="confirmar-pedido-container">
          <div className="loading">Cargando información del pedido...</div>
        </div>
      </>
    );
  }

  if (error || !pedido) {
    return (
      <>
        <NavBar />
        <div className="confirmar-pedido-container">
          <div className="error-message">
            <p>{error || 'Pedido no encontrado'}</p>
            <button onClick={() => navigate(-1)} className="back-button">Volver</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="confirmar-pedido-container">
        <h1 className="confirmar-pedido-title">Pedido Confirmado</h1>

        <div className="codigo-reserva-section">
          <p className="codigo-label">Tu código de reserva es:</p>
          <div className="codigo-display">
            {pedido.codigo_reserva.split('').map((digit, index) => (
              <span key={index} className="codigo-digit">{digit}</span>
            ))}
          </div>
          <p className="codigo-instructions">
            Guarda este código. Deberás proporcionarlo cuando vayas a retirar tus productos.
          </p>
        </div>

        <div className="pedido-info-section">
          <h2 className="section-title">Detalles del Pedido</h2>
          <div className="info-row">
            <span className="info-label">Campaña:</span>
            <span className="info-value">{pedido.campaign_nombre || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Fecha:</span>
            <span className="info-value">
              {new Date(pedido.fecha_creacion).toLocaleDateString('es-AR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Estado:</span>
            <span className="info-value estado-pendiente">Pendiente</span>
          </div>
        </div>

        <div className="productos-section">
          <h2 className="section-title">Productos Reservados</h2>
          <div className="productos-list">
            {productos.length === 0 ? (
              <p className="empty">No hay productos en este pedido.</p>
            ) : (
              productos.map((p, idx) => {
                const condicionLabel = p.estado === 'N' ? 'Nuevo' : p.estado === 'U' ? 'Usado' : p.estado || 'Nuevo';
                return (
                  <div key={p.id} className="producto-item">
                    <div className="producto-info">
                      <span className="producto-nombre">{p.nombre}</span>
                      <span className="producto-destino">{p.destino || 'Comunidad...'}</span>
                    </div>
                    <div className="producto-details">
                      <span className="producto-condicion">{condicionLabel}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="actions-section">
          <button 
            className="primary-button"
            onClick={() => navigate(`/campaign/${pedido.campaign_id}/products`)}
          >
            Ver más productos
          </button>
          <button 
            className="secondary-button"
            onClick={() => navigate('/homeaf')}
          >
            Volver al inicio
          </button>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Volver">
          ◀
        </button>
      </div>
    </>
  );
}

export default ConfirmarPedido;

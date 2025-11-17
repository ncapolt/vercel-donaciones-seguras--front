import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './PuntoRecoleccion.css';

function PuntoRecoleccion() {
  const navigate = useNavigate();
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOrganizador, setIsOrganizador] = useState(false);

  useEffect(() => {
    // Verificar si el usuario es organizador
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      try {
        const userData = JSON.parse(usuario);
        setIsOrganizador(userData.tipo_usuario_id === 2);
      } catch (e) {
        console.error('Error parsing usuario:', e);
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadDestinos() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('http://localhost:3000/api/destinos');
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'No se pudieron cargar los destinos');
        }

        if (isMounted) {
          setDestinos(result.destinos || []);
        }
      } catch (e) {
        if (isMounted) {
          console.error('Error cargando destinos:', e);
          setError(e.message || 'Error al cargar los destinos. Verifica que el backend esté corriendo en http://localhost:3000');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDestinos();
    return () => { isMounted = false; };
  }, []);

  const handleEdit = (destinoId) => {
    navigate(`/destino/${destinoId}/editar`);
  };

  const navbarLinks = [
    { label: 'Punto de recolección', href: '/punto-recoleccion' },
    { label: 'Campañas', href: isOrganizador ? '/homeog' : '/homeaf' }
  ];

  return (
    <>
      <NavBar links={navbarLinks} />
      <div className="punto-recoleccion-container">
        <h1 className="punto-recoleccion-title">Destinos cargados</h1>

        {loading && <p className="loading">Cargando destinos...</p>}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="destinos-table-wrap">
            <div className={`destinos-table ${isOrganizador ? 'with-actions' : ''}`}>
              <div className="table-row table-header">
                <div className="col nombre">Nombre</div>
                <div className="col direccion">Dirección</div>
                {isOrganizador && <div className="col acciones">Acciones</div>}
              </div>
              {destinos.length === 0 ? (
                <div className="empty">No hay destinos cargados aún.</div>
              ) : (
                destinos.map((destino, idx) => (
                  <div key={destino.id} className={`table-row ${idx % 2 === 0 ? 'row-even' : 'row-odd'}`}>
                    <div className="col nombre">
                      <span className="destino-nombre">{destino.nombre}</span>
                    </div>
                    <div className="col direccion">
                      <span className="destino-direccion">{destino.direccion}</span>
                    </div>
                    {isOrganizador && (
                      <div className="col acciones">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(destino.id)}
                          title="Editar destino"
                        >
                          ✏️
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {isOrganizador && (
              <div className="actions">
                <button 
                  className="nuevo-destino-button"
                  onClick={() => navigate('/destino/nuevo')}
                >
                  Nuevo Destino
                </button>
              </div>
            )}
          </div>
        )}

        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Volver">
          ◀
        </button>
      </div>
    </>
  );
}

export default PuntoRecoleccion;

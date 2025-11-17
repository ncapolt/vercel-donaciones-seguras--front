import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import './EntregarPedido.css';

function EntregarPedido() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, value) => {
    // Solo permitir números
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newCodigo = [...codigo];
    newCodigo[index] = value;
    setCodigo(newCodigo);
    setError('');

    // Auto-focus al siguiente input
    if (value && index < 5) {
      const nextInput = document.getElementById(`codigo-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Permitir borrar y moverse hacia atrás
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      const prevInput = document.getElementById(`codigo-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCodigo = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setCodigo(newCodigo.slice(0, 6));
      setError('');
      
      // Focus en el último input con valor o en el siguiente vacío
      const lastIndex = Math.min(pastedData.length - 1, 5);
      const nextInput = document.getElementById(`codigo-${lastIndex}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const codigoCompleto = codigo.join('');
    
    if (codigoCompleto.length !== 6) {
      setError('Por favor ingresa un código de 6 dígitos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/pedidos/codigo/${codigoCompleto}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Código de reserva no encontrado');
      }

      // Navegar a la página de verificación del pedido
      navigate(`/pedido/${result.pedido.id}/verificar`);
    } catch (err) {
      setError(err.message || 'Error al verificar el código. Verifica que el servidor esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="entregar-pedido-container">
        <div className="entregar-pedido-content">
          <h1 className="entregar-pedido-title">Ingresar código de reserva</h1>
          
          <p className="entregar-pedido-description">
            El beneficiario deberá darte su código de reserva para continuar con la entrega de la donación.
          </p>

          <form onSubmit={handleSubmit} className="codigo-form">
            <div className="codigo-inputs">
              {codigo.map((digit, index) => (
                <input
                  key={index}
                  id={`codigo-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="codigo-input"
                  disabled={loading}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            <button 
              type="submit" 
              className="siguiente-button"
              disabled={loading || codigo.join('').length !== 6}
            >
              {loading ? 'Verificando...' : 'Siguiente'}
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

export default EntregarPedido;

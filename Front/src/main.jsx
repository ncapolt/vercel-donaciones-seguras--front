import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeOg from './Pages/HomeOg';
import CampaignDetail from './Pages/CampaignDetail';
import CampaignProducts from './Pages/CampaignProducts';
import NuevoProducto from './Pages/NuevoProducto';
import EditarProducto from './Pages/EditarProducto';
import NuevaCampaña from './Pages/NuevaCampaña';
import HomeAf from './Pages/HomeAf';
import Login from './Pages/Login';
import User from './Pages/User';
import Registro from './Pages/Registro';
import RecuperarContraseña from './Pages/RecuperarContraseña';
import SignInAfectado from './Pages/SignInAfectado';
import SignInOrganizador from './Pages/SignInOrganizador';
import ElijaOpcion from './Pages/ElijaOpcion';
import Landing from './Pages/Landing';
import SignInAyudante from './Pages/SignInAyudante';
import EntregarPedido from './Pages/EntregarPedido';
import VerificarPedido from './Pages/VerificarPedido';
import ConfirmarPedido from './Pages/ConfirmarPedido';
import PuntoRecoleccion from './Pages/PuntoRecoleccion';
import NuevoDestino from './Pages/NuevoDestino';
import EditarDestino from './Pages/EditarDestino';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/homeog" element={<HomeOg />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/campaign/:campaignId/products" element={<CampaignProducts />} />
        <Route path="/campaign/:campaignId/nuevo-producto" element={<NuevoProducto />} />
        <Route path="/campaign/:campaignId/entregar-pedido" element={<EntregarPedido />} />
        <Route path="/pedido/:pedidoId/verificar" element={<VerificarPedido />} />
        <Route path="/pedido/:pedidoId/confirmar" element={<ConfirmarPedido />} />
        <Route path="/punto-recoleccion" element={<PuntoRecoleccion />} />
        <Route path="/destino/nuevo" element={<NuevoDestino />} />
        <Route path="/destino/:destinoId/editar" element={<EditarDestino />} />
        <Route path="/producto/:productId/editar" element={<EditarProducto />} />
        <Route path="/nueva-campana" element={<NuevaCampaña />} />
        <Route path="/homeaf" element={<HomeAf />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/recuperar" element={<RecuperarContraseña />} />
        <Route path="/signin-afectado" element={<SignInAfectado />} />
        <Route path="/signin-organizador" element={<SignInOrganizador />} />
        <Route path="/elija-opcion" element={<ElijaOpcion />} />
        <Route path="/" element={<Landing />} />
        <Route path="/signin-ayudante" element={<SignInAyudante />} />
      </Routes>
    </Router>
  </StrictMode>,
)

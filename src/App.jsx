import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authlayout from './layout/Authlayout'
import RutaProtegida from './layout/RutaProtegida'
import Login from './templates/Login'
import Registrar from './templates/Registrar'
import OlvidePassword from './templates/OlvidePassword'
import ConfirmarCuenta from './templates/ConfirmarCuenta'
import NuevoPassword from './templates/NuevoPassword'
import AdministrarPacientes from './templates/AdministrarPacientes'
import EditarPerfil from './templates/EditarPerfil'
import CambiarPassword from './templates/CambiarPassword'
import {AuthProvider} from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <PacientesProvider>
      <Routes>
        <Route path="/" element={<Authlayout />}>
          <Route index element={<Login />} />
          <Route path="registrar" element={<Registrar />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="olvide-password/:token" element={<NuevoPassword />} />
          <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
        </Route>
        <Route path='/admin' element={<RutaProtegida />}>
          <Route index element={<AdministrarPacientes />} />
          <Route path='perfil' element={<EditarPerfil />} />
          <Route path='cambiar-password' element={<CambiarPassword />} />
        </Route>
      </Routes>
      </PacientesProvider>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App

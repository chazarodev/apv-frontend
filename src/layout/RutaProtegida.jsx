import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {

    const {auth, cargando} = useAuth()

    if (cargando) {
        return "Cargando"
    } //Usuario no autenticado

    return (
        <>
            <Header />
            {auth?._id ? (
                <main className="container mx-auto mt-11 px-2">
                    <Outlet />
                </main>
                ) : <Navigate to={"/"} />
            }
            <Footer />
        </>

    )
}

export default RutaProtegida
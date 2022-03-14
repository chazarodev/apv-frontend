import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {

    const [cuentaConfirmada, setcuentaConfirmada] = useState(false)
    const [cargando, setcargando] = useState(true)
    const [alerta, setalerta] = useState({})

    const params = useParams();
    const {id} = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`
                const {data} = await clienteAxios.get(url)   
                setcuentaConfirmada(true)
                setalerta({
                    msg: data.msg,
                    error: false,
                }) 
            } catch (error) {
                setalerta({
                    msg: error.response.data.msg,
                    error: true,
                })
            }
            setcargando(false)
        }
        confirmarCuenta();
    }, [])

    return (
        <>
        <div>
            <h1 className="text-indigo-600 font-black text-5xl">Confirma tu cuenta y comienza a administrar tus <span className="text-black">pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-7 rounded-xl bg-white">
            {!cargando && 
                <Alerta 
                    alerta={alerta}
                />
            }
            {cuentaConfirmada && 
                <Link 
                    to="/"
                    className="block text-center my-5 text-gray-500"
                >
                    Inicia Sesión
                </Link>
            }
        </div>
        </>
    )
}

export default ConfirmarCuenta
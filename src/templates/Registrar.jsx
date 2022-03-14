import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Registrar = () => {

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg: 'Hay campos vacíos', error: true})
            return
        }

        if (password !== repetirPassword) {
            setAlerta({msg: 'Los Passwords no coinciden', error: true})
            return
        }

        if (password.length < 6) {
            setAlerta({msg: 'El password debe ser mínimo de 6 carácteres', error: true})
            return
        }

        setAlerta({})

        //Crear usuario en la API
        try {
            await clienteAxios.post('/veterinarios', {nombre, email, password}) //Petición POST a la API para registrar.
            setAlerta({
                msg: 'Registro exitoso, revisa tu email',
                error: false,
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            })
        }
    }

    const {msg} = alerta

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-5xl">Crea tu cuenta y administra tus <span className="text-black">pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-7 rounded-xl bg-white">
                {msg && 
                    <Alerta 
                        alerta={alerta}
                    />
                }
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            placeholder="Nombre de Registro"
                            className="border  w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="Email de Registro"
                            className="border  w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold mt-3">
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Tu Password"
                            className="border  w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold mt-3">
                            Confirmar Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Confirma Tu Password"
                            className="border  w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>
                        <input 
                            type="submit" 
                            value="Crear cuenta"
                            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer hover:bg-indigo-800 md:w-auto"
                        />
                </form> 
                <nav className="mt-2 lg:flex lg:justify-between">
                    <Link 
                        to="/"
                        className="block text-center my-5 text-gray-500"
                    >
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link 
                        to="/olvide-password"
                        className="block text-center my-5 text-gray-500"
                    >
                        Olvidé mi password
                    </Link>
                </nav> 
            </div>
        </>
    )
}

export default Registrar
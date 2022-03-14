import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios'

const PacienteContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})


    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.get('/pacientes', config) 
                setPacientes(data)

            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes()
    }, [])

    const guardarPaciente = async (paciente) => {
        
        const token = localStorage.getItem('token') //Obtener token
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacienteActualizado)
            } catch (error) {
                
            }    
        } else {
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                //CreatedAt, updatedAt y __v se excluyen y los valores restantes se almacenan en pacienteAlmacenado
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data //Crear un nuevo objeto con los valores requeridos 
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?')

        if (confirmar) {
            try {
                const token = localStorage.getItem('token') //Obtener token
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <PacienteContext.Provider
            value={{
                pacientes,
                paciente,
                guardarPaciente,
                setEdicion,
                eliminarPaciente
            }}
        >
            {children}
        </PacienteContext.Provider>
    )
}

export default PacienteContext
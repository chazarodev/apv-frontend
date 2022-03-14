import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

const useAuth = () => {
    return useContext(AuthContext) //Extraemos los valores
}

export default useAuth
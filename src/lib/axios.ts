

//TODO: AXIOS 2 
// ASI LLAMAMOS A LAS VARIABLES DE ENTORNO EN VITE 
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api
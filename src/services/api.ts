import axios from 'axios';

// Instancia base apuntando al BFF
const apiBff = axios.create({
    baseURL: 'http://localhost:8080/api/bff',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Función para obtener los envíos desde el BFF
export const obtenerEnvios = async () => {
    try {
        const response = await apiBff.get('/logistica/envios');
        return response.data;
    } catch (error) {
        console.error("Error al conectar con el BFF", error);
        throw error;
    }
};

export default apiBff;
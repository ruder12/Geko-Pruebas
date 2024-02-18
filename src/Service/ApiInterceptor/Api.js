/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import getToken from './Token'
import config from '../../Config/config';

const Api = axios.create({
    baseURL: config.API_SERVER
    // Otras configuraciones si son necesarias
});

Api.interceptors.request.use(
    (config) => {
        let token = getToken();
        // Verifica si el token es válido antes de enviar la solicitud
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            return;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Api;

import { store } from '../../store';

const getToken = () => {
    const state = store.getState();
    let token = state?.account?.user?.token;

    return token;
};

const getRol = () => {
    const state = store.getState();
    let rol = state?.account?.user?.rol;
    if (rol === 'ADMIN') {
        return rol;
    }
    return null;
};

export { getToken as default, getRol };

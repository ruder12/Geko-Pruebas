import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes2 from './MainRoutes2';
import { useSelector } from 'react-redux';
import config from '../Config/config';

// ==============================|| ROUTING RENDER ||============================== //

export default function RoutesMain() {
    const rol = useSelector((state) => state.account.user?.rol);
    return useRoutes([LoginRoutes, rol !== config.admin ? MainRoutes2 : MainRoutes]);
}

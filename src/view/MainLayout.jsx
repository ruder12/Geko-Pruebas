import { Outlet } from "react-router-dom";
import "../assets/stylebarTop.css"
import Logout from "../components/Logout";
import { useSelector } from "react-redux";
import config from "../Config/config";

const MainLayout = () => {
    const rol = useSelector((state) => state.account.user?.rol);
    return (<>
    <h4>{rol}</h4>
        <ul className="menu">
            {rol === config.admin ?
                <><li><a href="/empresa" className="active">Empresa</a></li>
                    <li><a href="/inventario">Inventario</a></li>
                    <li><a href="/producto">Producto</a></li>
                </> : ""}

            <li><Logout /></li>
            
        </ul>
        <Outlet /></>);
}

export default MainLayout;


// ==============================|| MAIN ROUTING ||============================== //

import Company from "../view/Company";
import Inventory from "../view/Inventory";
import MainLayout from "../view/MainLayout";
import Product from "../view/Product";
import AuthGuard from "./route-guard/AuthGuard";

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <Company />
        },
        {
            path: 'empresa',
            element: <Company />
        },
        {
            path: 'producto',
            element: <Product />
        },{
            path: 'inventario',
            element: <Inventory />
        }
    ]
};

export default MainRoutes;

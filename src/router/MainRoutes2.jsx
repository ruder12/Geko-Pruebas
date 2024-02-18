/* eslint-disable no-unused-vars */

import Company from '../view/Company';
import AuthGuard from './route-guard/AuthGuard';
import MainLayout from '../view/MainLayout';



// ==============================|| MAIN ROUTING ||============================== //

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
        }
    ]
};

export default MainRoutes;

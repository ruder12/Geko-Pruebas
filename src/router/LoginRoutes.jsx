/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import GuestGuard from './route-guard/GuestGuard';
import { Outlet } from 'react-router-dom';
import AuthLogin from '../components/AuthLogin';
import Error404 from '../Error/Error404';




//-----------------------|| AUTH ROUTING ||-----------------------//

const LoginRoutes = {
    path: '/',
    element: (
    <GuestGuard>
        <Outlet />
    </GuestGuard>
    ),
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: '*',
            element: <Error404 />
        }
    ]
};

export default LoginRoutes;

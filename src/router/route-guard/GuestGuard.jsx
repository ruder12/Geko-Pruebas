/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import config from '../../Config/config';


//-----------------------|| GUEST GUARD ||-----------------------//

const GuestGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
    const { isLoggedIn } = account;

    if (isLoggedIn) {
        return <Navigate to={config.defaultPath} />;
    }

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;

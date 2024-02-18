import axios from "axios";
import config from "../Config/config";
import "../assets/styleLogin.css"
import { useDispatch } from "react-redux";
import { ACCOUNT_INITIALIZE } from "../store/actions";
import { useState } from "react";

const AuthLogin = () => {
    const dispatcher = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const submitLogin = async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        try {
            const response = await axios.post(config.API_SERVER + 'auth/login', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                dispatcher({
                    type: ACCOUNT_INITIALIZE,
                    payload: { isLoggedIn: true, user: response.data.tokenAcceso, token: response.data.tokenAcceso.token }
                });
            } else {
                console.log('Error en la Consulta de la Api ', response);
            }
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    };

    return (
        <>
            <form className='login-form' onSubmit={submitLogin}>
                <div className="flex-row">
                    <input id="username" className='lf--input' placeholder='Username' type='text' value={username} onChange={handleUsernameChange} />
                </div>
                <div className="flex-row">
                    <input id="password" className='lf--input' placeholder='Password' type='password' value={password} onChange={handlePasswordChange} />
                </div>
                <input className='lf--submit' type='submit' value='LOGIN' />
            </form>
        </>
    );
}

export default AuthLogin;
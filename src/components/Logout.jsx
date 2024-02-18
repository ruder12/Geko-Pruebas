import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import config from '../Config/config';
import { LOGOUT } from '../store/actions';

const Logout = () => {
    const dispatcher = useDispatch();
    const dataUser = useSelector((state) => state.account.user);
    const handleLogout = async () => {
        try {
            const response = await axios.post(config.API_SERVER + `auth/logout?email=${dataUser.email}`);
            if (response.status === 200) {
                dispatcher({ type: LOGOUT });
            }
        } catch (error) {
            console.error(error);
        }
    };
 
    return (
        <a onClick={handleLogout}>Logout</a>
    );
}

export default Logout;

import { useEffect, useState } from 'react';
import TableInventory from '../components/TableInventory';
import { useDispatch } from 'react-redux';
import { ACCOUNT_INITIALIZE } from '../store/actions';
import Api from '../Service/ApiInterceptor/Api';
const Inventory=()=> {

    const [data, setData] = useState([]);
    const dispatcher = useDispatch();

    const fetchData = async () => {
        try {
            const response = await Api.get(`inventory`);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            if (error.response.status === 401) {
                dispatcher({
                    type: ACCOUNT_INITIALIZE,
                    payload: { isLoggedIn: false, user: null, token: '' }
                });
            }
            console.error(error.message);
        }
    };
    useEffect(() => {
    
        fetchData();
    },[]);
    return ( <>
        <TableInventory tabledata={data}/>
    </> );
}

export default Inventory;
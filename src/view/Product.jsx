import { useDispatch } from 'react-redux';
import Api from '../Service/ApiInterceptor/Api';
import TableProduct from '../components/TableProduct';
import { useEffect, useState } from 'react';
import { ACCOUNT_INITIALIZE } from '../store/actions';
const Product=()=> {
    const [data, setData] = useState([]);
    const dispatcher = useDispatch();
    const fetchData = async (moneda) => {
        try {
            let paht = moneda != null?`products?moneda=${moneda}`:`products`

            const response = await Api.get(paht);
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
    
        fetchData(null);
    },[]);

    return ( <>
    <TableProduct tabledata={data} onClick={fetchData} />
    </> );
}

export default Product;
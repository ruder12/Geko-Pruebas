import { useEffect, useState } from "react";
import Api from "../Service/ApiInterceptor/Api";
import TableCompany from "../components/TableCompany";
import { ACCOUNT_INITIALIZE } from "../store/actions";
import { useDispatch } from "react-redux";

const Company = () => {
    const [data, setData] = useState([]);
    const dispatcher = useDispatch();
    const fetchData = async () => {
        try {
            const response = await Api.get(`company`);
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
    },);


    return ( <><TableCompany tabledata={data}/></> );
}

export default Company;
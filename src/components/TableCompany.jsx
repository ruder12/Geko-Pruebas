import PropTypes from 'prop-types';
import Table from './Table';
import ButtonsActions from './ButtonActions';
import { useDispatch, useSelector } from 'react-redux';
import EmpresaForm from './EmpresaForm';
import Api from '../Service/ApiInterceptor/Api';
import { useState } from 'react';
import { ACCOUNT_INITIALIZE } from '../store/actions';

const TableCompany = ({ tabledata }) => {
    const sure = useSelector((state) => state.account.user?.rol);
    const [data, setData] = useState(null);
    const dispatcher = useDispatch();

    const columns = [
        {
            name: 'Nit',
            sortable: true,
            selector: row => row.nit
        }, {
            name: 'Name',
            sortable: true,
            selector: row => row.nombre
        }, {
            name: 'Address',
            selector: row => row.address
        }, {
            name: 'Phone',
            selector: row => row.telefono
        },{
            name: 'Actions',
            sortable: true,
            button: true,
            cell: row => sure ? (
                <>
                    <ButtonsActions id={row.nit} name={"Edit"} onClick={updateCompany} />
                    <ButtonsActions id={row.id} name={"Delete"} onClick={deleteCompany} />
                </>
            ) : null,
        },

    ]

    const updateCompany = async (nit) => {
        try {
            const response = await Api.get(`company/getbynit/${nit}`);
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
    }

    const deleteCompany = async (id) => {
        try {
            const response = await Api.delete(`company/${id}`);
            if (response.status === 200) {
                window.location.reload();
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
    }
    return (
        <>
         
        <Table title={"Table Company"} columns={columns} data={tabledata} />
        {sure ?<EmpresaForm data={data} />:""}
        </>
    );
};


TableCompany.propTypes = {
    tabledata: PropTypes.shape({
        address: PropTypes.string,
        fecha: PropTypes.string,
        id: PropTypes.number,
        nit: PropTypes.string,
        nombre: PropTypes.string,
        telefono: PropTypes.string,
    }).isRequired
};


export default TableCompany
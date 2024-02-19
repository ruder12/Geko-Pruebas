import PropTypes from 'prop-types';
import Table from './Table';
import ButtonsActions from './ButtonActions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ACCOUNT_INITIALIZE } from '../store/actions';
import Api from '../Service/ApiInterceptor/Api';
import ProductoForm from './ProductoForm';

const TableProduct = ({ tabledata, onClick }) => {
    const sure = useSelector((state) => state.account.user?.rol);
    const [data, setData] = useState(null);
    const dispatcher = useDispatch();
    const columns = [
        {
            name: 'Code',
            selector: row => row.codigo
        }, {
            name: 'Name',
            selector: row => row.nombre
        }, {
            name: 'Characteristics',
            selector: row => row.caracteristicas
        },
        {
            name: 'Price',
            button: true,
            cell: row => row.precio,

        }, {
            name: 'Company',
            selector: row => row.empresa.nombre
        },
        {
            name: 'Actions',
            sortable: true,
            button: true,
            cell: row => sure ? (
                <>
                    <ButtonsActions id={row.id} name={"Edit"} onClick={updateProduct} />
                    <ButtonsActions id={row.id} name={"Delete"} onClick={deleteProduct} />
                </>
            ) : null,
        }

    ]
    const updateProduct = async (nit) => {
        try {
            const response = await Api.get(`products/${nit}`);
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

    const deleteProduct = async (id) => {
        try {
            const response = await Api.delete(`products/${id}`);
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

    const [selectedCurrency, setSelectedCurrency] = useState('');

    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    return (
        <>
            <div>
                <label htmlFor="Currency-select">Select a currency:</label>
                <select name="Currency" id="Currency-select"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                 className='select-custom'>
                    <option value="">--Please choose an option--</option>
                    <option value="AUD">AUD</option>
                    <option value="ARS">ARS</option>
                    <option value="COP">COP</option>
                    <option value="JPY">JPY</option>
                </select>
                <button onClick={() => onClick(selectedCurrency)}>Convert</button>
            </div>
            <Table title={"Table Product"} columns={columns} data={tabledata} />
            {sure ?<ProductoForm data={data} />:""}
            </>
    );
};


TableProduct.propTypes = {
    tabledata: PropTypes.shape({
        caracteristicas: PropTypes.string.isRequired,
        codigo: PropTypes.string.isRequired,
        empresa: PropTypes.shape({
            address: PropTypes.string.isRequired,
            fecha: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            nit: PropTypes.string.isRequired,
            nombre: PropTypes.string.isRequired,
            telefono: PropTypes.string.isRequired
        }).isRequired,
        fechaRegistro: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};


export default TableProduct
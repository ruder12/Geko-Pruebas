import PropTypes from 'prop-types';
import Table from './Table';
import ButtonsActions from './ButtonActions';
import { useSelector } from 'react-redux';
import Api from '../Service/ApiInterceptor/Api';

const TableInventory = ({ tabledata }) => {
    const sure = useSelector((state) => state.account.user?.rol);
    const columns = [
        {
            name: 'Code',
            selector: row => row.producto.codigo
        }, {
            name: 'Name',
            selector: row => row.producto.nombre
        }, {
            name: 'Movements',
            selector: row => row.movimiento
        }, {
            name: 'Company',
            selector: row => row.producto.empresa.nombre
        }, {
            name: 'Date',
            selector: row => row.fechaRegistro
        },

    ]
    const GenerarPdf = async () => {
        try {
            const response = await Api.get("inventory/generarInforme", {
                responseType: 'blob' // Indicar que se espera una respuesta de tipo blob
            });
    
            const blob = response.data;
            const newBlob = new Blob([blob], { type: 'application/pdf' });
    
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
            } else {
                const objUrl = window.URL.createObjectURL(newBlob);
    
                let link = document.createElement('a');
                link.href = objUrl;
                link.download = "InformeHistorial.pdf"; // Agregar la extensión .pdf al nombre del archivo
                link.click();
    
                setTimeout(() => { window.URL.revokeObjectURL(objUrl); }, 250);
            }
        } catch (error) {
            console.error(error);
        }
    };




return (
    <>
        {sure ? <ButtonsActions id={"0"} name={"Dowload PDF"} onClick={GenerarPdf} /> : ""}
        <Table title={"Table Inventory"} columns={columns} data={tabledata} />
        <ButtonsActions id={"0"} name={"Notificar"} onClick={()=>alert("notificar")} />
        </>
);
};


TableInventory.propTypes = {
    tabledata: PropTypes.oneOfType([
        PropTypes.shape({
            cantidad: PropTypes.number.isRequired,
            fechaRegistro: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            movimiento: PropTypes.string.isRequired,
            producto: PropTypes.shape({
                caracteristicas: PropTypes.string,
                codigo: PropTypes.string.isRequired,
                empresa: PropTypes.shape({
                    address: PropTypes.string,
                    fecha: PropTypes.string,
                    id: PropTypes.number,
                    nit: PropTypes.string,
                    nombre: PropTypes.string,
                    telefono: PropTypes.string
                }).isRequired,
                fechaRegistro: PropTypes.string.isRequired,
                id: PropTypes.number.isRequired,
                nombre: PropTypes.string.isRequired,
                precio: PropTypes.number.isRequired
            }).isRequired
        }),
        PropTypes.arrayOf(PropTypes.shape({
            cantidad: PropTypes.number.isRequired,
            fechaRegistro: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            movimiento: PropTypes.string.isRequired,
            producto: PropTypes.shape({
                caracteristicas: PropTypes.string,
                codigo: PropTypes.string.isRequired,
                empresa: PropTypes.shape({
                    address: PropTypes.string,
                    fecha: PropTypes.string,
                    id: PropTypes.number,
                    nit: PropTypes.string,
                    nombre: PropTypes.string,
                    telefono: PropTypes.string
                }).isRequired,
                fechaRegistro: PropTypes.string.isRequired,
                id: PropTypes.number.isRequired,
                nombre: PropTypes.string.isRequired,
                precio: PropTypes.number.isRequired
            }).isRequired
        }))
    ]).isRequired
};

export default TableInventory
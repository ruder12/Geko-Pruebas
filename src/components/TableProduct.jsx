import PropTypes from 'prop-types';
import Table from './Table';
import config from '../Config/config';
import ButtonsActions from './ButtonActions';

const TableProduct = ({ tabledata }) => {
    const sure = tabledata.user === config.admin;
    const columns = [
        {
            name: 'Code',
            selector: row => row.Code
        }, {
            name: 'Name',
            selector: row => row.Name
        }, {
            name: 'Characteristics',
            selector: row => row.Characteristics
        },
        {
            name: 'Price',
            button: true,
            cell: row => row.Price,

        }, {
            name: 'Company',
            selector: row => row.Company
        },
        {
            name: 'Actions',
            selector: row => row.fat,
            sortable: true,
            button: true,
            cell: row => sure ? <> <ButtonsActions id={row.Code} name={"Edit"} /><ButtonsActions id={row.Code} name={"Delete"} /></> : <></>,
        }

    ]
    const data = tabledata.rows.map((row, index) => ({ id: index, ...row }));

    return (
        <>
            <div>
                <label htmlFor="Currency-select">Select a currency:</label>
                <select name="Currency" id="Currency-select">
                    <option value="">--Please choose an option--</option>
                    <option value="AUD">AUD</option>
                    <option value="ARS">ARS</option>
                    <option value="CNY">CNY</option>
                    <option value="CLP">CLP</option>
                    <option value="COP">COP</option>
                    <option value="JPY">JPY</option>
                </select>
                <button onClick={() => alert("covertir")}>Convert</button>
            </div>
            {sure ? <ButtonsActions id={0} name={"Add Product"} /> : ""}
            <Table title={"Table Product"} columns={columns} data={data} /></>
    );
};


TableProduct.propTypes = {
    tabledata: PropTypes.shape({
        headers: PropTypes.arrayOf(PropTypes.string).isRequired,
        rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        user: PropTypes.number
    }).isRequired
};


export default TableProduct
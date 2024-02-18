import PropTypes from 'prop-types';
import Table from './Table';
import config from '../Config/config';
import ButtonsActions from './ButtonActions';

const TableInventory = ({ tabledata }) => {
    const sure = tabledata.user === config.admin;
    const columns = [
        {
            name: 'Code',
            selector: row => row.Code
        }, {
            name: 'Name',
            selector: row => row.Name
        }, {
            name: 'Movements',
            selector: row => row.Movements
        },
        {
            name: 'date',
            button: true,
            cell: row => row.date,

        }, {
            name: 'Company',
            selector: row => row.Company
        },

    ]
    const data = tabledata.rows.map((row, index) => ({ id: index, ...row }));

    return (
        <>
            {sure ? <ButtonsActions id={0} name={"Dowload PDF"} /> : ""}
            <Table title={"Table Inventory"} columns={columns} data={data} /></>
    );
};


TableInventory.propTypes = {
    tabledata: PropTypes.shape({
        headers: PropTypes.arrayOf(PropTypes.string).isRequired,
        rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        user: PropTypes.number
    }).isRequired
};


export default TableInventory
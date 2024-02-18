import { PropTypes } from "prop-types";
import DataTable from "react-data-table-component";

const Table = ({ title,columns, data }) => {
    
    return (
        <>
            <DataTable
            title={title}
                columns={columns}
                data={data}
                pagination
            />
        </>
    );
}

Table.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        sortable: PropTypes.bool,
        selector: PropTypes.func,
        button: PropTypes.bool,
        cell: PropTypes.func,
    })).isRequired,
    data: PropTypes.object,
    
};

export default Table;
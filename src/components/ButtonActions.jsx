import PropTypes from 'prop-types';





const ButtonsActions = ({ id, name ,onClick}) => {
    
    return (
        <div className="button-container">
            <button onClick={() => onClick(id)}>{name}</button>
        </div>
    )
}
ButtonsActions.propTypes = {
id: PropTypes.string,
name: PropTypes.string,
onClick: PropTypes.func.isRequired,
}

export default ButtonsActions
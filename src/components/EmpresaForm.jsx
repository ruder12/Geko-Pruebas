/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Api from '../Service/ApiInterceptor/Api';
import PropTypes from 'prop-types';

const MySwal = withReactContent(Swal)


const EmpresaForm = ({data}) => {
  const [empresaData, setEmpresaData] = useState({
    nit: "",
    nombre: '',
    address: '',
    telefono: ''
  });

  useEffect(() => {
    if(data != null){
      setEmpresaData(data);
    }
  },[])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmpresaData({ ...empresaData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!empresaData.nit || !empresaData.nombre || !empresaData.address || !empresaData.telefono) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!'
      });
    } else {

      console.log('Datos de la empresa:', empresaData);
      saveCompany(empresaData)
    }
  };
  const saveCompany = async (empresa)=>{
    await Api.post('company', empresa)
        .then(function (response) {
            if (response.status === 200) {
              window.location.reload();
            } 
        
        })
        .catch(function (error) {
          console.log(error)
        });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nit"
        value={empresaData.nit}
        onChange={handleInputChange}
        placeholder="Nit"
        className="swal2-input"
      />
      <input
        type="text"
        name="nombre"
        value={empresaData.nombre}
        onChange={handleInputChange}
        placeholder="Name"
        className="swal2-input"
      />
      <input
        type="text"
        name="address"
        value={empresaData.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="swal2-input"
      />
      <input
        type="text"
        name="telefono"
        value={empresaData.telefono}
        onChange={handleInputChange}
        placeholder="Phone"
        className="swal2-input"
      />
      <button type="submit" >
        Guardar
      </button>
    </form>
  );
};

EmpresaForm.propTypes = {
  data: PropTypes.shape({
    nit: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired
    // Define otras propiedades esperadas de data aquí, si las hay
  }).isRequired
};

export default EmpresaForm;
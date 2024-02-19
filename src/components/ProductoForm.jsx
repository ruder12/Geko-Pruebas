/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Api from '../Service/ApiInterceptor/Api';
import PropTypes from 'prop-types';

const MySwal = withReactContent(Swal)


const ProductoForm = ({data}) => {
  const [productData, setProductData] = useState({
      id:  0,
      caracteristicas: '',
      codigo: "",
      empresa: {
        address: '',
        fecha: '',
        id: 0,
        nit: '',
        nombre: '',
        telefono: ''
    },
      fechaRegistro: '',
      nombre: '',
      precio: 0
 
  });

  useEffect(() => {
    if (data != null) {

      setProductData({
          id: data.id || '',
          caracteristicas: data.caracteristicas || '',
          codigo: data.codigo || '',
          empresa: {
              address: data.empresa.address || '',
              fecha: data.empresa.fecha || '',
              id: data.empresa.id || 0,
              nit: data.empresa.nit || '',
              nombre: data.empresa.nombre || '',
              telefono: data.empresa.telefono || ''
          },
          fechaRegistro: data.fechaRegistro || '',
          nombre: data.nombre || '',
          precio: data.precio || 0
      });
    }
}, [data]);
const handleInputChange = (event) => {
  const { name, value } = event.target;
  if (name.startsWith("empresa.")) {
      // Si el nombre del campo comienza con "empresa.", significa que es un campo de la empresa
      const empresaField = name.split(".")[1]; // Obtener el nombre del campo dentro de "empresa"
      setProductData({
          ...productData,
          empresa: {
              ...productData.empresa,
              [empresaField]: value
          }
      });
  } else {
      // Si no, actualizar el campo directamente en productData
      setProductData({ ...productData, [name]: value });
  }
};
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del Prodcuto:', productData);
    if (!productData.caracteristicas || !productData.nombre || !productData.precio || !productData.empresa.id) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!'
      });
    } else {
      saveProducto(productData)
    }
  };
  const saveProducto = async (empresa)=>{
    await Api.post('products', empresa)
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
        name="caracteristicas"
        value={productData.caracteristicas}
        onChange={handleInputChange}
        placeholder="Caracteristicas"
        className="swal2-input"
      />
      <input
        type="text"
        name="nombre"
        value={productData.nombre}
        onChange={handleInputChange}
        placeholder="Nombre"
        className="swal2-input"
      />
      <input
        type="number"
        name="precio"
        value={productData.precio}
        onChange={handleInputChange}
        placeholder="Precio"
        className="swal2-input"
      />
      <input
        type="number"
        name="empresa.id"
        value={productData.empresa.id}
        onChange={handleInputChange}
        placeholder="Empresa Id"
        className="swal2-input"
      />
      <button type="submit" >
        Guardar
      </button>
    </form>
  );
};

ProductoForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    caracteristicas: PropTypes.string.isRequired,
    codigo: PropTypes.string.isRequired,
    empresa: PropTypes.shape({
      address: PropTypes.string.isRequired,
      fecha: PropTypes.string,
      id: PropTypes.number.isRequired,
      nit: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired
    }).isRequired,
    fechaRegistro: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired
  }).isRequired
};

export default ProductoForm;
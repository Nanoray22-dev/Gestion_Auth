import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const AddModalPage = ({ isOpen, closeModal, addPage }) => {
  const [userData, setUserData] = useState({
    nombre: "",
    url: "",
    descripcion: "",
    icono: "",
    fecha: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convertir el valor de rol_id a un número si corresponde
    const newValue = name === 'rol_id' ? parseInt(value, 10) : value;
    setUserData({ ...userData, [name]: newValue });
    // Verificar si el valor está vacío y agregar o quitar la clase input-error en consecuencia
    if (newValue === "") {
      e.target.classList.add("input-error");
    } else {
      e.target.classList.remove("input-error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si algún campo está vacío
    const isEmptyField = Object.values(userData).some((value) => value === "");

    if (isEmptyField) {
      // Mostrar alerta de campos vacíos
      Swal.fire({
        title: "Error",
        text: "Por favor, complete todos los campos.",
        icon: "error",
      });
    } else {
      // Todos los campos están completos, agregar el usuario
      addPage(userData);
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Agregar Usuario"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Agregar Usuario</h2>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.nombre === "" && "input-error"
                }`}
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="url"
              >
                URL:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.url === "" && "input-error"
                }`} 
                placeholder="ejemplo@gmail.com"
                type="text"
                name="url"
                value={userData.url}
                onChange={handleChange}
              />
            </div>
            {/* <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.password === "" && "input-error"
                }`}
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div> */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                 Descripcion:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.descripcion === "" && "input-error"
                }`}
                type="text"
                name="descripcion"
                value={userData.descripcion}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="icono"
              >
                 Iconos:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.icono === "" && "input-error"
                }`}
                type="text"
                name="icono"
                value={userData.icono}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fecha"
              >
                  Fecha:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.fecha === "" && "input-error"
                }`}
                type="date"
                name="fecha"
                value={userData.fecha}
                onChange={handleChange}
              />
            </div>
            
            {/* <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Número de Teléfono:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.telefono === "" && "input-error"
                }`}
                type="text"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
              />
            </div> */}
            {/* <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                 Papel:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.rol_id === "" && "input-error"
                }`}
                type="number"
                name="rol_id"
                value={userData.rol_id}
                onChange={handleChange}
              />
            </div> */}
            {/* <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="estado"
              >
                Estado:
              </label>
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.username === "" && "input-error"
                }`}
                name="estado"
                value={userData.estado}
                onChange={handleChange}
              >
                <option value="">Seleciona el estado del usuario</option>
                <option value="activo">activo</option>
                <option value="inactivo">inactivo</option>
              </select>
            </div> */}
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              type="submit"
            >
              Agregar Pagina
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddModalPage;

AddModalPage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  addPage: PropTypes.func.isRequired,
};

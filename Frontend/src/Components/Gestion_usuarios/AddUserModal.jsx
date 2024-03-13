import { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const AddUserModal = ({ isOpen, closeModal, addUser }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    empresa: "",
    telefono: "",
    role: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // Verificar si el valor está vacío y agregar o quitar la clase input-error en consecuencia
    if (value === "") {
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
      addUser(userData);
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
                htmlFor="username"
              >
                Nombre de Usuario:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.username === "" && "input-error"
                }`}
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.username === "" && "input-error"
                }`} 
                placeholder="ejemplo@gmail.com"
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.username === "" && "input-error"
                }`}
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empresa"
              >
                Nombre de Empresa:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.username === "" && "input-error"
                }`}
                type="text"
                name="empresa"
                value={userData.empresa}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Número de Teléfono:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.username === "" && "input-error"
                }`}
                type="text"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Papel:
              </label>
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.username === "" && "input-error"
                }`}
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="">Seleciona el papel del usuario</option>
                <option value="Administrador">Administrador</option>
                <option value="RespVentasTiendas">RespVentasTiendas</option>
                <option value="SupervisorComercial">SupervisorComercial</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Estado:
              </label>
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userData.username === "" && "input-error"
                }`}
                name="status"
                value={userData.status}
                onChange={handleChange}
              >
                <option value="">Seleciona el estado del usuario</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              type="submit"
            >
              Agregar Usuario
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

export default AddUserModal;

AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
};

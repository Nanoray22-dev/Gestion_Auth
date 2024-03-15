import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Rol() {
  const [roles, setRoles] = useState([]);
  const [newRol, setNewRol] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    axios
      .get("http://127.0.0.1:8000/api/roles")
      .then((response) => {
        setRoles(response.data.roles);
      })
      .catch((error) => {
        setError(
          "Error al obtener los roles. Por favor, inténtelo de nuevo más tarde."
        );
        console.error("Error al obtener los roles:", error);
      });
  };

  const handleAddRol = () => {
    axios
      .post("http://127.0.0.1:8000/api/roles", { rol: newRol })
      .then((response) => {
        const newRole = response.data.data;
        setRoles((prevRoles) => [...prevRoles, newRole]);
        setNewRol("");
        setError(null);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Rol agregado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        setError(
          "Error al agregar el nuevo rol. Por favor, inténtelo de nuevo más tarde."
        );
        console.error("Error al agregar el nuevo rol:", error);
      });
  };

  const handleDeleteRol = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/roles/${id}`)
      .then(() => {
        fetchRoles(); // Vuelve a cargar los roles desde el servidor después de eliminar uno
        Swal.fire({
          icon: "success",
          title: "Rol eliminado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setError(
          "Error al eliminar el rol. Por favor, inténtelo de nuevo más tarde."
        );
        console.error("Error al eliminar el rol:", error);
      });
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div className="mt-4">
        <button
          onClick={handleAddRol}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Añadir Rol
        </button>
        <label
          htmlFor="rol"
          className="block text-sm font-medium text-gray-700"
        >
          Nuevo Rol
        </label>
        <input
          type="text"
          name="rol"
          id="rol"
          value={newRol}
          onChange={(e) => setNewRol(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rol
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {roles &&
            roles.map((role, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{role && role.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {role && role.rol}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteRol(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rol;

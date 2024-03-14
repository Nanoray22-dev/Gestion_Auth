import { useState, useEffect } from "react";
import axios from "axios";

function Rol() {
  const [roles, setRoles] = useState([]);
  const [newRol, setNewRol] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/roles")
      .then((response) => {
        setRoles(response.data.roles);
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error);
      });
  }, []);

  const handleAddRol = () => {
    axios
      .post("http://127.0.0.1:8000/api/roles", { rol: newRol })
      .then((response) => {
        setRoles([...roles, response.data.data]);

        setNewRol("");
      })
      .catch((error) => {
        console.error("Error al agregar el nuevo rol:", error);
      });
  };

  return (
    <div>
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
        {/* Encabezados de la tabla */}
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
                Accion
              </th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{role.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{role.rol}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {role.usuariocreacion}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </table>
      
    </div>
  );
}

export default Rol;

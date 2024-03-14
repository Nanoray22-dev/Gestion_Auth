import { useEffect, useState } from "react";
import axios from "axios";


function Enlaces() {
  const [enlaces, setEnlaces] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET para obtener los enlaces desde la API
    axios.get('http://127.0.0.1:8000/api/enlaces')
      .then(response => {
        setEnlaces(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los enlaces:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4">
    <h2 className="text-lg font-bold mb-4">Enlaces</h2>
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">ID</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Página ID</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Rol ID</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Descripción</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Fecha de Creación</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">Fecha de Modificación</th>
          </tr>
        </thead>
        <tbody>
          {enlaces.map(enlace => (
            <tr key={enlace.id}>
              <td className="px-4 py-2 border border-gray-400">{enlace.id}</td>
              <td className="px-4 py-2 border border-gray-400">{enlace.pagina_id}</td>
              <td className="px-4 py-2 border border-gray-400">{enlace.rol_id}</td>
              <td className="px-4 py-2 border border-gray-400">{enlace.descripcion}</td>
              <td className="px-4 py-2 border border-gray-400">{enlace.created_at}</td>
              <td className="px-4 py-2 border border-gray-400">{enlace.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    )
}

export default Enlaces
import axios from "axios";
import { useEffect, useState } from "react"


function Bitacoras() {
  const [bitacora, setBitacora] = useState([]);

  useEffect(()=>{
    axios
      .get("http://127.0.0.1:8000/api/bitacoras")
      .then((response) => {
        setBitacora(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error);
      });
  },[])
  return (
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
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Hora
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Descripcion
              </th>
              

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bitacora.map((bit) => (
              <tr key={bit.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{bit.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{bit.fecha}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {bit.hora}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {bit.navegador}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </table>
  )
}

export default Bitacoras
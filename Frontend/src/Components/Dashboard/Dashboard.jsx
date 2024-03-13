import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

function Dashboard() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  const [userData, setUserData] = useState([]);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/auth/users')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  useEffect(() => {
    const createChart = (chartRef, data, type) => {
      if (chartRef.current) {
        // Destruye el gráfico existente si existe
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }

        // Crea un nuevo gráfico
        chartRef.current.chart = new Chart(chartRef.current, {
          type: type,
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    const lineChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Line Chart",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const barChartData = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "bar",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    createChart(lineChartRef, lineChartData, "line");
    createChart(barChartRef, barChartData, "bar");
  }, []);



  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Card 1</h2>
            <p>Contenido de la tarjeta 1</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Card 2</h2>
            <p>Contenido de la tarjeta 2</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Card 3</h2>
            <p>Contenido de la tarjeta 3</p>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reporte en graficos</h2>
          {/* Aquí puedes insertar tus gráficos */}
          <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Reporte Diario</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <canvas
                  ref={lineChartRef}
                  style={{ maxWidth: "100%" }}
                ></canvas>
              </div>
              <div>
                <canvas ref={barChartRef} style={{ maxWidth: "100%" }}></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de usuarios */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
          {/* Aquí puedes insertar tu tabla de usuarios */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { Menu } from "@headlessui/react";
import axios from "axios";
import ColumnVisibilityDropdown from "./ColumnVisibilityDropdown";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [roleNames, setRoleNames] = useState({});

  const getPdf = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/auth/users`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );
    window.open(url, "_blank");
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/roles");
      const roleData = response.data.roles;
      const roleNamesData = {};
      roleData.forEach((role) => {
        roleNamesData[role.id] = role.rol;
      });
      setRoleNames(roleNamesData);
    } catch (error) {
      console.error("Error fetching role names:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const addUser = async (userData) => {
    try {
      // Verificar si el nombre de usuario ya existe
      const existingUser = users.find((user) => user.name === userData.name);
      if (existingUser) {
        // Mostrar SweetAlert de error
        Swal.fire({
          title: "Error",
          text: "Este usuario ya existe.",
          icon: "error",
        });
        return;
      }

      // Si el nombre de usuario no existe, agregar el usuario
      console.log("Agregando usuario:", userData);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/users",
        userData
      );

      console.log("Respuesta del servidor:", response.data);

      if (response.status === 201) {
        // Mostrar SweetAlert de éxito
        Swal.fire({
          title: "¡Usuario agregado!",
          text: "El usuario se ha agregado correctamente.",
          icon: "success",
        });
      }

      closeModal();
      fetchUsers();
    } catch (error) {
      console.error("Error al agregar usuario:", error.message);
    }
  };

  const openEditModal = (userId) => {
    setSelectedUserId(userId);
    setIsEditModalOpen(true);
  };

  const handleEditUser = async (updatedUserData) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/auth/users/${selectedUserId}`,
        updatedUserData
      );
      if (response.status === 200) {
        Swal.fire({
          title: "¡Usuario modificado!",
          text: "Usuario actualizado exitosamente.",
          icon: "success",
        });
      }
      closeEditModal();
      fetchUsers();
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
    }
  };

  const deletePerson = async (userId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/auth/users/${userId}`);
        console.log("Usuario eliminado correctamente");
        fetchUsers();
        setSelectedUsers([]);
      } catch (error) {
        console.error("Error al eliminar usuario:", error.message);
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setUsersPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleUserSelection = (userId) => {
    const isSelected = selectedUsers.includes(userId);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    // Actualizar el estado de cada checkbox individual
    const updatedUsers = users.map((user) => ({
      ...user,
      selected: checked,
    }));
    setUsers(updatedUsers);
    const allSelected = updatedUsers.every((user) => user.selected);
    setSelectAll(allSelected);
  };

  const imprimirSelectedUsers = () => {
    // Obtener los detalles de los usuarios seleccionados
    const selectedUsersDetails = users.filter((user) =>
      selectedUsers.includes(user.id)
    );

    console.log("Imprimiendo usuarios seleccionados:", selectedUsersDetails);

    Swal.fire({
      title: "¡Imprimiendo!",
      text: "¡se ha impreso correctamente!",
      icon: "success",
    });
  };

  const [visibleColumns, setVisibleColumns] = useState({
    username: true,
    email: true,
    empresa: true,
    telefono: true,
    role: true,
    status: true,
  });

  const handleColumnVisibilityChange = (columnName) => {
    setVisibleColumns((prevVisibleColumns) => ({
      ...prevVisibleColumns,
      [columnName]: !prevVisibleColumns[columnName],
    }));
  };

  return (
    <div className="">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={openModal}
      >
        Agregar Usuario
      </button>

      <AddUserModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addUser={addUser}
      />

      {selectedUserId && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={handleEditUser}
          user={users.find((user) => user.id === selectedUserId)}
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <select
            id="usersPerPage"
            value={usersPerPage}
            onChange={handlePerPageChange}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <label htmlFor="usersPerPage" className="ml-2 text-gray-700">
            Registros por página
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="mr-2">
            Buscar:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <div className="flex items-center">
            <button
              className="bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2 transition duration-300 hover:bg-gray-500 hover:text-white"
              onClick={getPdf}
            >
              PDF
            </button>
            <button className="bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2 transition duration-300 hover:bg-gray-500 hover:text-white">
              CSV
            </button>
            <button
              onClick={imprimirSelectedUsers}
              disabled={selectedUsers.length === 0}
              className="bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2 transition duration-300 hover:bg-gray-500 hover:text-white"
            >
              Impresión
            </button>
            <button
              onClick={deletePerson}
              className="bg-gray-300 text-gray-700 rounded px-4 py-2 transition duration-300 hover:bg-gray-500 hover:text-white"
            >
              Borrar
            </button>
            {/*  */}

            <ColumnVisibilityDropdown
              visibleColumns={visibleColumns}
              handleColumnVisibilityChange={handleColumnVisibilityChange}
            />

            {/*  */}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-slate-100 rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-2">
                {" "}
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-2">Nombre de Usuario</th>
              <th className="px-4 py-2">apellido</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Número de Teléfono</th>
              <th className="px-4 py-2">Papel</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={user.selected}
                    onChange={() => handleUserSelection(user.id)}
                  />
                </td>

                <td className="border px-4 py-2 text-center">{user.name}</td>
                <td className="border px-4 py-2 text-center">
                  {user.primer_apellido} {user.segundo_apellido}
                </td>
                <td className="border px-4 py-2 text-center">{user.email}</td>
                <td className="border px-4 py-2 text-center">
                  {user.fecha_nacimiento}
                </td>
                <td className="border px-4 py-2 text-center">
                  {user.telefono}
                </td>
                <td className="border px-4 py-2 text-center">
                  {" "}
                  {roleNames[user.rol_id]
                    ? roleNames[user.rol_id]
                    : "(no asignado)"}
                </td>
                <td className={`border px-4 py-2 text-center`}>
                  <span
                    className={`inline-block bg-gray-200 rounded px-4 py-1 border border-gray-300 ${
                      user.estado === "activo" ? "bg-green-300" : "bg-red-300"
                    } `}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <Menu>
                    {({ open }) => (
                      <>
                        <Menu.Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ">
                          Acciones
                        </Menu.Button>

                        <Menu.Items
                          className={`${
                            open ? "block" : "hidden"
                          } absolute right-5  w-32 bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none`}
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                                onClick={() => openEditModal(user.id)}
                              >
                                Editar
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                                onClick={() => deletePerson(user.id)}
                              >
                                Eliminar
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </>
                    )}
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="pagination flex justify-center mt-4">
        <li className="page-item   hover:text-white">
          <a
            className="page-link  border border-gray-300 px-3 py-1 rounded-l hover:bg-blue-500"
            href="#"
            onClick={() => paginate(1)}
          >
            Previous
          </a>
        </li>
        {Array.from(
          { length: Math.ceil(filteredUsers.length / usersPerPage) },
          (_, index) => (
            <li key={index} className="page-item">
              <a
                className="page-link  border border-gray-300 px-3 py-1"
                href="#"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          )
        )}
        <li className="page-item hover:text-white">
          <a
            className="page-link  border border-gray-300 px-3 py-1 rounded-r hover:bg-blue-500"
            href="#"
            onClick={() => paginate(2)}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}

export default UsersList;

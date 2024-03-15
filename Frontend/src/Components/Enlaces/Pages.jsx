import  { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditModalPage from "./EditModalPage";
import { Menu } from "@headlessui/react";
import axios from "axios";
import AddModalPage from "./AddModalPage";

function Pages() {
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [pagesPerPage, setPagesPerPage] = useState(10);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/paginas");
      const responseData = response.data;
      if (Array.isArray(responseData.paginas)) {
        setPages(responseData.paginas);
      } else {
        console.error("El valor de 'paginas' no es un array:", responseData.paginas);
      }
    } catch (error) {
      console.log("Error fetching pages", error);
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

  const addPage = async (pageData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/paginas",
        pageData
      );
      if (response.status === 201) {
        Swal.fire({
          title: "¡Página agregada!",
          text: "La página se ha agregado correctamente.",
          icon: "success",
        });
      }
      closeModal();
      fetchPages();
    } catch (error) {
      console.error("Error al agregar página:", error.message);
    }
  };

  const openEditModal = (pageId) => {
    setSelectedPageId(pageId);
    setIsEditModalOpen(true);
  };

  const handleEditPage = async (updatedPageData) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/paginas/${selectedPageId}`,
        updatedPageData
      );
      if (response.status === 200) {
        Swal.fire({
          title: "¡Página modificada!",
          text: "Página actualizada exitosamente.",
          icon: "success",
        });
      }
      closeEditModal();
      fetchPages();
    } catch (error) {
      console.error("Error al actualizar página:", error.message);
    }
  };

  const deletePage = async (pageId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminada, no podrás recuperar esta página.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/paginas/${pageId}`);
        console.log("Página eliminada correctamente");
        fetchPages();
        setSelectedPages([]);
      } catch (error) {
        console.error("Error al eliminar página:", error.message);
      }
    }
  };

  // const filteredPages = pages.filter((page) =>
  //   page.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const indexOfLastPage = currentPage * pagesPerPage;
  // const indexOfFirstPage = indexOfLastPage - pagesPerPage;
  // const currentPages = filteredPages.slice(indexOfFirstPage, indexOfLastPage);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setPagesPerPage(parseInt(event.target.value));
    // setCurrentPage(1);
  };

  const handlePageSelection = (pageId) => {
    const isSelected = selectedPages.includes(pageId);
    if (isSelected) {
      setSelectedPages(selectedPages.filter((id) => id !== pageId));
    } else {
      setSelectedPages([...selectedPages, pageId]);
    }
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    const updatedPages = pages.map((page) => ({
      ...page,
      selected: checked,
    }));
    setPages(updatedPages);
    const allSelected = updatedPages.every((page) => page.selected);
    setSelectAll(allSelected);
  };

  const imprimirSelectedPages = () => {
    const selectedPagesDetails = pages.filter((page) =>
      selectedPages.includes(page.id)
    );
    console.log("Imprimiendo páginas seleccionadas:", selectedPagesDetails);
    Swal.fire({
      title: "¡Imprimiendo!",
      text: "¡Se ha impreso correctamente!",
      icon: "success",
    });
  };

  return (
    <div className="">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={openModal}
      >
        Agregar Página
      </button>

      <AddModalPage
        isOpen={isModalOpen}
        closeModal={closeModal}
        addPage={addPage}
      />

      {selectedPageId && (
        <EditModalPage
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={handleEditPage}
          page={pages.find((page) => page.id === selectedPageId)}
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <select
            id="pagesPerPage"
            value={pagesPerPage}
            onChange={handlePerPageChange}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <label htmlFor="pagesPerPage" className="ml-2 text-gray-700">
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
              onClick={imprimirSelectedPages}
              disabled={selectedPages.length === 0}
              className="bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2 transition duration-300 hover:bg-gray-500 hover:text-white"
            >
              Impresión
            </button>
            <button
              onClick={deletePage}
              className="bg-gray-300 text-gray-700 rounded px-4 py-2 transition duration-300 hover:bg-gray-500 hover:text-white"
            >
              Borrar
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-slate-100 rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Icono</th>
              <th className="px-4 py-2">Fecha</th>


              <th className="px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={page.selected}
                    onChange={() => handlePageSelection(page.id)}
                  />
                </td>
                <td className="border px-4 py-2 text-center">{page.nombre}</td>
                <td className="border px-4 py-2 text-center">{page.url}</td>
                <td className="border px-4 py-2 text-center">{page.descripcion}</td>
                <td className="border px-4 py-2 text-center">{page.icono}</td>
                <td className="border px-4 py-2 text-center">{page.fecha}</td>

               
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
                                onClick={() => openEditModal(page.id)}
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
                                onClick={() => deletePage(page.id)}
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

      {/* <ul className="pagination flex justify-center mt-4">
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
          { length: Math.ceil(filteredPages.length / pagesPerPage) },
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
      </ul> */}
    </div>
  );
}

export default Pages;

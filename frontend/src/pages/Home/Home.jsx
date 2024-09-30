import React, { useState } from "react";
import NavBar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

// Asegurar accesibilidad configurando el elemento principal de la app
Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <NavBar />

      <div className="container mx-auto">
        {/* Estilo de la grilla */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting el 7 de Abril"
            date="7 de Abril"
            content="Meeting el 7 de Abril"
            tags="Meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            OnPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        className="bg-white w-[40%] max-h-[80%] rounded-lg shadow-lg p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
    </>
  );
};

export default Home;

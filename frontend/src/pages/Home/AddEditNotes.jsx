import React from "react";

const AddEditNotes = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label">Titulo</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Ir al Gym a las 5"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Contenido</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Contenido de la nota"
          rows={10}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput />
      </div>

      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;

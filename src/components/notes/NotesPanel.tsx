import AddNoteForm from "./AddNoteForm";

import { Task } from "@/types/index";
import NoteDetail from "./NoteDetail";

interface Props {
  notes: Task["notes"];
}

function NotesPanel(props: Props) {
  const { notes } = props;

  console.log("notes :>> ", notes);

  return (
    <>
      <AddNoteForm />

      <div className=" mt-10">
        {notes.length ? (
          <>
            <p className="font-bold text-2xl text-slate-600 my-5">
              Notas:
              {notes.map((note) => (

                <div className=" border-b border-gray-100">

                  <NoteDetail key={note._id} note={note} />
                </div>
              ))}
            </p>
          </>
        ) : (
          <p>No hay notas</p>
        )}
      </div>
    </>
  );
}

export default NotesPanel;

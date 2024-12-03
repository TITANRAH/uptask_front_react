import { deleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formateDate, useQueryParams } from "@/utils/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  note: Note;
}

function NoteDetail(props: Props) {
  const { note } = props;

  const params = useParams();
  const projectId = params.projectId!;

  const taskId = useQueryParams("viewTask");

  const queryClient = useQueryClient();

  console.log("note :>> ", note);

  //TODO: ELIMINAR NOTA

  //   1. llammamos al hook de use auth
  const { data, isLoading } = useAuth();

  // 2. usamos la data del hook y llamamos a usememo para comparar si el id del usuario logeado es igual al id del usuario que creo la nota
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  if (isLoading) return "Cargando...";

  const handleDelete = () => {
    const data = { projectId, taskId, noteId: note._id };
    mutate(data);
  };
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por:{" "}
          <span className="font-bold">{note.createdBy.name.toUpperCase()}</span>
        </p>

        <p className="text-xs text-slate-500">{formateDate(note.createdAt)}</p>
      </div>
      {/* 3. condicionar sollo poemos eliminar lo que nosotros creamos como nota  */}
      {canDelete && (
        <button
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
          type="button"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}

export default NoteDetail;

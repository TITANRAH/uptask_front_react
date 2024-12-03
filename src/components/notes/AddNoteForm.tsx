import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createNote } from "@/api/NoteApi";
import { useParams } from "react-router-dom";
import { useQueryParams } from "@/utils/index";



// TODO: CREAR FORMULARIO NOTES 1

// TODO: CREAR FORMULARIO NOTES 4

// 1 NOTES 4 TRAER USE MUTATION DE REACT QUERY

function AddNoteForm() {
  // 4. NOTES 4 TRAER EL PARAMETRO DE LA URL
  const params = useParams();
  const projectId = params.projectId!;

   // 5. NOTES 4
    // TRAER QUERY CLIENT PARA INVALIDAR LA QUERY
    const queryClient = useQueryClient();

  // USARE MI FUNCION HOOK PARA OBJTENER QQUERY PARAMS Y ASI OBTENER EL EL TASK ID
  const taskId = useQueryParams('viewTask');

  // 2. NOTES 4 CREAR LA MUTACION
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      // queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });

  // 1. NOTES 1 Crear los valores inciales del formulario
  const initialValues: NoteFormData = {
    // SE DECLARA COMO VACIO
    // SI FUER AEDICION SE PUEDE PASAR EL VALOR QUE SE QUIERE EDITAR
    content: "",
  };

  //  2; NOTES 1 Crear el hook useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  // 6. NOTES 1 Crear la funcion para enviar el formulario
  const handleAddNote = (formData: NoteFormData) => {
    // 3. NOTES 4 llamar LA MUTACION CREAR VARIABLE DATA CON
    // LOS PARAMETROS QUE REQUIERE LA MUTACION EN ESTE CASO CREATENOTE
    const data = {
      projectId,
      taskId,
      formData,
    };
    mutate(data);
  };
  //   3. NOTES 1 ir a types para crear el tipo de este initial value
  return (
    // 7. NOTES 1 Pasar en el omSubmit la funcion que se encargara de enviar el formulario
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Crear Nota
        </label>

        {/* 4. NOTES 1 Usar register en el input del form */}
        <input
          id="content"
          type="text"
          placeholder="contenido de la nota"
          className="w-full p-3 border border-gray-300"
          {...register("content", { required: "El contenido es requerido" })}
        />
        {/* 5. NOTES 1 mostrar el error renderizando el componente deidcado a es error*/}
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Crear Nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  );
}

export default AddNoteForm;

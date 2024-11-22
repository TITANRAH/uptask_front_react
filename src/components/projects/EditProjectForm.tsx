import { useForm } from "react-hook-form";
import ButtonNavProject from "../ButtonNavProject";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  data: ProjectFormData;
  projectId: Project["_id"];
}

function EditProjectForm(props: Props) {
  // RECIBIMOS LA DATA DEL PROYECTO
  const { data, projectId } = props;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },

    // AL FORMULARIO LE PASAMOS LOS VALORES ENCONTRADOS DE LOSSRRV
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  //TODO: REACT QUERY INVALIDATE QUERIES 1
  // instanciamos el query client
  const queryClient = useQueryClient();


  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {

      //TODO: REACT QUERY INVALIDATE QUERIES 2
      // ESTO NOS PERMITE DECIDIR CUAL CONSULTA DEBE SER NUEVA Y NO CACHEADA 
      // ENTONCES ESTO NOS PERMITIRA QUE AL VOLVER A LA PAGINA DE PROYECTOS
      // SE RECARGUE LA PAGINA CON LOS DATOS ACTUALIZADOS
      // TECNICAMENTE DESHABILITAMOS LA CACHE DE LA CONSULTA DE PROYECTOS
      queryClient.invalidateQueries({queryKey: ["projects"]});
      queryClient.invalidateQueries({queryKey: ["editProject", projectId]});
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = async (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId,
    };
    mutate(data);
  };
  return (
    <div className="max-w-3xl mx-auto">
      <ButtonNavProject
        textTitle="Editar Proyecto"
        textButton="Volver a Proyectos"
        textSubtitle="Llena el siguiente formulario para editar un proyecto"
        to="/"
      />
      <form
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm register={register} errors={errors} />
        <input
          type="submit"
          value="Editar Proyecto"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white uppercase font-bold cursor-pointer transition-colors p-3"
        />
      </form>
    </div>
  );
}

export default EditProjectForm;

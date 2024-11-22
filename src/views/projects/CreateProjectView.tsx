import ButtonNavProject from "@/components/ButtonNavProject";
import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function CreateProjectView() {
  // TODO: USENAVIGATE
  // es como el useRouter de next
  const navigate = useNavigate();

  // TODO: REACT HOOK FORM 1

  // - useForm es un hook que nos permite manejar formularios de una manera mas sencilla
  // - useForm recibe un objeto con las propiedades defaultValues que es un objeto con los valores iniciales del formulario
  // en este caso el objeto initialValus con los campos vacios

  //   TODO: ZOD 3
  // LLAMAMOS AL TIPO GENERADO Y TIPAMOS EL OBJETO
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // TODO REACT QUERY 2
  // creamos una mutacion con useMutation
  const mutation = useMutation({
    // aqui va la mutacion con la funcion de la api aunque lleve parametros va sin parametros
    // esta funcion solo devuelve el mensaje de exito o de error
    mutationFn: createProject,
    // aqui van los callbacks de la mutacion
    // en este caso el que sucede si hay un error
    onError: (error) => {

      toast.error(error.message);
      
    },
    // aqui si todo sale bien
    // data que es el mensaje que devuelve la api en caso de exito
    // lo toma en el parametro de este callback de onSuccess
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  // AQUI IGUAL TIPAMOS LA DATA QUE RECIBIREMOS EN EL FORMULARIO
  const handleForm = async (formData: ProjectFormData) => {
    // el parametro que pide la funcion se le pasa aca en el mutateasync
    // puede ser asi uysando await y mutateasync o sin await ni async ni siquiera en la funcion padre
    // await mutation.mutateAsync(formData);
    mutation.mutate(formData);
  };
  return (
    <div className="max-w-3xl mx-auto">
      <ButtonNavProject
        textTitle="Crear Proyecto"
        textButton="Volver a Proyectos"
        textSubtitle="Llena el siguiente formulario para crear un proyecto"
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
          value="Crear Proyecto"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white uppercase font-bold cursor-pointer transition-colors p-3"
        />
      </form>
    </div>
  );
}

export default CreateProjectView;

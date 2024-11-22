import { getProjectById } from "@/api/ProjectApi";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

function EditProjectView() {
  const params = useParams();

  //   TODO: EDICION DE PROYECTO
  // TOMAMOS EL ID DEL PROYECTO
  const projectId = params.projectId;

  // USAMOS REACT QUERY PARA LOGRAR TENEER LA DATA Y LAS DEMAS VARIABLES QUE DETERMINAN LOADINGS Y ERORES
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId!),

    // si da error consutla 1 o 2 o 3 con retry puedo definir cuantas veces o poner falso para que nbo consulte mas de 1
    retry: false,
  });

  //   PUEDO MANDAR UN SQUELETON
  if (isLoading) return "Cargando...";
  // SI DA ERROR TE MANDAN A LA PAGINA DE ERROR 404
  if (isError) return <Navigate to={"/404"} />;

  // SI HAY DATA PASASELA AL COMPONENTE DE FORMULARIO
  if (data) return <EditProjectForm data={data} projectId={projectId!} />;
}

export default EditProjectView;

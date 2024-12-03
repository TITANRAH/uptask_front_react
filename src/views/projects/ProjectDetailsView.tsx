import { getFullProject } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/index";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function ProjectDetailsView() {
  const { data: user, isLoading: loading } = useAuth();

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const projectId = params.projectId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getFullProject(projectId!),

    retry: false,
  });

  // TODO: USEMEMO 

  
  // NO PUEDE HABER CONDICIONES ARRIBA DE UN HOOK
  const canEdit = useMemo(() => data?.manager === user?._id,[data, user])

  console.log('canEdit :>> ', canEdit);
  
  if (isLoading && loading) return "Cargando...";
  if (isError) return <Navigate to={"/404"} />;


  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500">{data.description}</p>
       {/* retorna true o false */}
        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-500 text-white text-xl px-10 py-3 font-bold cursor-pointer transition-colors"
              onClick={() => navigate(location.pathname + `?newTask=true`)}
            >
              Agregar Tarea
            </button>

            <Link
              className="bg-fuchsia-600 hover:bg-purple-700 text-white text-xl px-10 py-3 font-bold cursor-pointer transition-colors"
              to={"team"}
            >
              Colaboradores
            </Link>
          </nav>
        )}
        <TaskList tasks={data.tasks} canEdit={canEdit} />

        {/* //TODO: MODALES DE CREAR TAREAS Y EDITAR TAREAS */}
        <AddTaskModal />

        <EditTaskData />

        <TaskModalDetails />
      </>
    );
}

export default ProjectDetailsView;

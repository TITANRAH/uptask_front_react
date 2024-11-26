import { getProjectById } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import {  useQuery } from "@tanstack/react-query";


import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";



function ProjectDetailsView() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const projectId = params.projectId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId!),
  
    retry: false,
  });


  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to={"/404"} />;

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500">{data.description}</p>

        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 text-white text-xl px-10 py-3 font-bold cursor-pointer transition-colors"
            onClick={() => navigate(location.pathname + `?newTask=true`)}
          >
            Agregar Tarea
          </button>
        </nav>
        <TaskList 
          tasks={data.tasks}
        />

        {/* //TODO: MODALES DE CREAR TAREAS Y EDITAR TAREAS */}
        <AddTaskModal />

        <EditTaskData/>

        <TaskModalDetails/>
      </>
    );
}

export default ProjectDetailsView;

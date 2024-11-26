import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/TaskApi";
import EditTaskModal from "./EditTaskModal";
import { useQueryParams } from "@/utils/index";

function EditTaskData() {
  const params = useParams();
  console.log("params :>> ", params);
  const projectId = params.projectId!;

  // TODO: LEER QUERY STRINGS
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const taskId = queryParams.get("editTask")!;

  const taskId = useQueryParams("editTask");

  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    // si hay task id se ejeuta la funcion
    enabled: !!taskId,
    retry: false,
    
  });

  console.log("data :>> ", data);

  if (isError) return <Navigate to={"/404"} />;

  if (data) return <EditTaskModal data={data} taskId={taskId} />;
}

export default EditTaskData;

import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { TaskFormData, Project, Task, tasksSchema } from "@/types/index";

// TODO: USANDO PICK
// podemos agregar mas tipos altask principal sin afecftar a los demas endpoint
type TaskApi = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: Task["status"];

  // si aqui agragara una propiedad mas al usar pick no se vera afectada las demas funciones
};

export async function createTask({
  formData,
  projectId,
}: Pick<TaskApi, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskApi, "projectId" | "taskId">) {
  console.log("projectId :>> ", projectId);
  console.log("taskId :>> ", taskId);

  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api(url);

    // TODO: VALIDACIONES CON ZOD EN UNA PETICION HTTP
    // asi validamos con el schema de zod
    const response = tasksSchema.safeParse(data);

    if (response.success) {
      console.log("respomse desde getTaskById->", response.data);
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function updateTask({
  projectId,
  taskId,
  formData,
}: Pick<TaskApi, "projectId" | "taskId" | "formData">) {
  console.log("projectId :>> ", projectId);
  console.log("taskId :>> ", taskId);

  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.put(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteTask({
  projectId,
  taskId,
}: Pick<TaskApi, "projectId" | "taskId">) {
  console.log("projectId :>> ", projectId);
  console.log("taskId :>> ", taskId);

  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.delete<string>(url);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function updateStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskApi, "projectId" | "taskId" | "status">) {
  console.log("projectId :>> ", projectId);
  console.log("taskId :>> ", taskId);

  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`;
    const { data } = await api.post<string>(url, { status });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

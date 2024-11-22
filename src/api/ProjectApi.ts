import api from "@/lib/axios";
import { dashboardSchema, Project, ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
  // TODO: AXIOS 3

  // LLAMAMOS A LA CREACION DEAXIOS QQUE YA CONTENE LA URL BASE Y LE PONEMOS EL ENDPOINT SOLAMENTE
  try {
    const { data } = await api.post("/projects", formData);
    // console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function getProjects() {
  // TODO: AXIOS 3

  // LLAMAMOS A LA CREACION DEAXIOS QQUE YA CONTENE LA URL BASE Y LE PONEMOS EL ENDPOINT SOLAMENTE
  try {
    const { data } = await api("/projects");

    // TODO: VALIDACIUON DE RESPUESTA HTTP CON ZOD
    // validamos la respuesta con zod
    const response = dashboardSchema.safeParse(data);
    console.log("respomse ->", response);
    // edvolvemos la data
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// TODO: ZOD VALIDACION HTTP
// validacion de parametro
// llamamos al zod y le decimos que es de tipo de zod que en este caso es de tipo string
export async function getProjectById(id: Project["_id"]) {
  // TODO: AXIOS 3

  // LLAMAMOS A LA CREACION DEAXIOS QQUE YA CONTENE LA URL BASE Y LE PONEMOS EL ENDPOINT SOLAMENTE
  try {
    const { data } = await api(`/projects/${id}`);
    console.log("data get prject by id ->", data);
    
    return data;
   
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

interface UpdateProject {
  formData: ProjectFormData;
  projectId: Project["_id"];
}

export async function updateProject({formData, projectId}: UpdateProject) {
  
  console.log("formData ->", formData);
  console.log("projectId ->", projectId);
  
  
  // TODO: AXIOS 3

  // LLAMAMOS A LA CREACION DEAXIOS QQUE YA CONTENE LA URL BASE Y LE PONEMOS EL ENDPOINT SOLAMENTE
  try {

    // TODO: ZOD SOLO RECOMENDABLE PARA PETICIONES TIPO GET
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
    console.log("data get prject by id ->", data);
    
    return data;
   
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}


export async function deleteProject(id: Project["_id"]) {
  // TODO: AXIOS 3

  // LLAMAMOS A LA CREACION DEAXIOS QQUE YA CONTENE LA URL BASE Y LE PONEMOS EL ENDPOINT SOLAMENTE
  try {
    //TODO: PUEDO IR AL BACKEND A VER QUE DEVUELVE EN ESTE CASO ES UN STRING 
    // POR ESO TIPO DE DATO STRING
    // AUNQUE PODRIA TIPAR LOS GET CON ZOD O UNA INTERFACE
    const { data } = await api.delete<string>(`/projects/${id}`);
    console.log("data get prject by id ->", data);
    
    return data;
   
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

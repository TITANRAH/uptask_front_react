// TODO: CREAR FORMULARIO NOTES 3

import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

// 1. Craer interface para las funciones

type NoteAPItype = {
  formData: NoteFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};

// 2. Crear funcion para crear nota
export async function createNote({
  formData,
  projectId,
  taskId,
}: Pick<NoteAPItype, "formData" | "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error.response?.data ->", error.response?.data);
      return error.response?.data.message;
    }
  }
}

// 3 ir a addNOTEFORM A CREAR LA MUTACION

export async function deleteNote({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPItype, "projectId" | "taskId" | "noteId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    const { data } = await api.delete<string>(url);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error.response?.data ->", error.response?.data);
      return error.response?.data.message;
    }
  }
}

import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { TeamMember, TeamMemberForm, teamMembersSchema } from "../types";
import { Project } from "../types";

// TODO: TIPADO OBJETO PARA MUTATIONS DE MAS DE UN PARAMETRO
export async function findUserByEmail({
  projectId,
  formData,
}: {
  projectId: Project["_id"];
  formData: TeamMemberForm;
}) {
  try {
    const { data } = await api.post(
      `/projects/${projectId}/team/find`,
      formData
    );

    console.log("data", data);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error.response?.data ->", error.response?.data);
      return error.response?.data.message;
    }

    return error;
  }
}
export async function addUserToProject({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: TeamMember["_id"];
}) {
  console.log("id", { id });

  try {
    const { data } = await api.post<string>(`/projects/${projectId}/team`, { id });

    console.log("data", data);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error.response?.data ->", error.response?.data);
      return error.response?.data.message;
    }

    return error;
  }
}
export async function getProyectTeam(projectId: Project["_id"]) {
  try {
    const { data } = await api(`/projects/${projectId}/team`);

    const response = teamMembersSchema.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.message;
    }

    return error;
  }
}

export async function removeUserFromProject({
  projectId,
  userId,
}: {
  projectId: Project["_id"];
  userId: TeamMember["_id"];
}) {
  console.log("id", { userId });

  try {
    const { data } = await api.delete<string>(`/projects/${projectId}/team/${userId}`);

    console.log("data", data);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error.response?.data ->", error.response?.data);
      return error.response?.data.message;
    }

    return error;
  }
}

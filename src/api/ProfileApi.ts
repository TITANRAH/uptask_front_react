// TODO: CREAR FORMULARIO NOTES 3

import { isAxiosError } from "axios";
import { UpdateCurrentPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";

export async function updateProfile(formData: UserProfileForm) {
  try {
    const {data} = await api.put<string>("/auth/profile", formData);
    console.log('data', data);
    
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error.response?.data ->", error.response?.data);
      return error.response?.data.message;
    }
  }
}
export async function changePassword(formData: UpdateCurrentPasswordForm) {
  try {
    const {data} = await api.post<string>("/auth/update-password", formData);
    console.log('data', data);
    
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error.response?.data ->", error.response?.data);
      return error.response?.data.message;
    }
  }
}

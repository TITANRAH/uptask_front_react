import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "@/types/index.ts";

export async function createAccount(formData: UserRegistrationForm) {
  try {
    console.log(formData);

    const url = "/auth/create-account";
    const { data } = await api.post<string>(url, formData);
    
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
    }
  }
}

// TODO: OBJETO ESPERADO

// DECIMOS QUE EL FORMDATA SERA UN CONFIRM TOKEN Q UE ES UN OBJETO
// POR LO QUE DEL OTRO LADO EN EL COMPONENTE DEBEMOS PASARLE TOKEN COMO UN OBJECTO
export async function confirmAccount(formData: ConfirmToken) {
  try {
    // console.log('formData desde confirm Account', formData);

    const url = "/auth/confirm-account";
    const { data } = await api.post<string>(url, formData);
    // console.log('data desde confirm Account', data);
    
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}


// TODO: REQUEST CONFIRMATION CODE
export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
  try {
    // console.log('formData desde confirm Account', formData);

    const url = "/auth/request-code";
    const { data } = await api.post<string>(url, formData);
    // console.log('data desde confirm Account', data);
    
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticateUser(formData: UserLoginForm) {
  try {
    console.log('formData desde confirm Account', formData);

    const url = "/auth/login";
    const { data } = await api.post<string>(url, formData);
    // console.log('data desde confirm Account', data);
    
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

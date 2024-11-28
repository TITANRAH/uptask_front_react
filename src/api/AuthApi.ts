import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
  userSchema,
} from "@/types/index.ts";

export async function createAccount(formData: UserRegistrationForm) {
  try {
    console.log(formData);

    const url = "/auth/create-account";
    const { data } = await api.post<string>(url, formData);

    return data;
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

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// TODO: REQUEST CONFIRMATION CODE
export async function requestConfirmationCode(
  formData: RequestConfirmationCodeForm
) {
  try {
    // console.log('formData desde confirm Account', formData);

    const url = "/auth/request-code";
    const { data } = await api.post<string>(url, formData);
    // console.log('data desde confirm Account', data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticateUser(formData: UserLoginForm) {
  try {
    console.log("formData desde confirm Account", formData);

    const url = "/auth/login";
    const { data } = await api.post<string>(url, formData);
    console.log("login authenticate user", data);
    localStorage.setItem("AUTH_TOKEN", data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    console.log("formData desde confirm Account", formData);

    const url = "/auth/forgot-password";
    const { data } = await api.post<string>(url, formData);
    // console.log('data desde confirm Account', data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function validateToken(formData: ConfirmToken) {
  try {
    console.log("formData desde confirm Account", formData);

    const url = "/auth/validate-token";
    const { data } = await api.post<string>(url, formData);
    // console.log('data desde confirm Account', data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// EL ENDPOINT NECESITA TOKEN Y PASSWORD
// Y COMO MUTATION ACEPTA SOLO UN VALOR OBJETO DEBEMOS PASARLE UN OBJETO CON TOKEN Y PASSWORD
export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) {
  try {
    // console.log('formData desde confirm Account', formData, token);

    const url = `/auth/update-password/${token}`;
    const { data } = await api.post<string>(url, formData);
    // console.log('data desde confirm Account', data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUser() {
  try {
    const { data } = await api("/auth/user");

    console.log(data);

    // TODO: VALIDACION ZOD DE USER 

    // hacemos el llamado 
    // edclaraos la variable response 
    // importamos usersChema y pasamos con safeparse para que valide la data 
    // devolvemos response.data si response.success
    const response = userSchema.safeParse(data);

    if (response.success) {
      return response.data;
    }

   
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

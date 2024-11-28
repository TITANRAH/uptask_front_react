import { z } from "zod";

//AUTH

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
// NOS VALEMOS DE USAR PICK PARA AGREGAR TOKEN A AUTHSCHEMA Y PODER USAR OTRA VALIDACION
export type ConfirmToken = Pick<Auth, "token">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;

// USERS

// TOMAMOS DOS DE AUTSCHEMA Y AGREGAMOS _ID
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });

export type User = z.infer<typeof userSchema>;
// TASKS

// definimos los status de las tareas que iran ene l schema
export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export type TaskStatus = z.infer<typeof taskStatusSchema>;

// CREAMOS EL ESQUEMA A USAR EN EL ORMGULARIO DE CREACION DE TAREAS
export const tasksSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  // aqui le pasamos el taskstatus
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof tasksSchema>;

// definimos un nuevo tipo para el form doonde solo usaremos description y name de momento y lo hacemos con Pick
export type TaskFormData = Pick<Task, "description" | "name">;

// Projects
//TODO: ZOD 2

// CREAMOS EL ESQUEMA A USAR EN EL ORMGULARIO DE CREACION DE PROYECTOS
// EXPORTAMOS LOS TIPOS QUE SE GENERARON UNO DE PROYECTO USANDO EL SQUEMA
// Y OTRO DE FORMULARIO DE PROYECTO
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

// TODO: VALIDACION DE RESPUESTA HTTP CON ZOD 2
export const dashboardSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);
export type Project = z.infer<typeof projectSchema>;

// el pick es para deciddir que campos ocuparemos solamente ENTONES PICK DE DE PROUECT SOLO CLIENTNAME Y PROJECTNAME Y DESCRIPTION
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;

import { z } from "zod";

//AUTH

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  current_password: z.string(),
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
export type CheckPasswordForm = Pick<Auth, "password">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type UpdateCurrentPasswordForm = Pick<
  Auth,
  "current_password" | "password" | "password_confirmation"
>;

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
export type UserProfileForm = Pick<User, "name" | "email">;

// NOTES

// TODO: CREAR FORMULARIO NOTES 2

// 1. Crear los campos que contendra noteSchema y eso lo puedo ver en el backemd
// o en la respuesta http
export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});

// 2. Crear el tipo de nota que se usara en el formulario
export type Note = z.infer<typeof noteSchema>;

// 3. Crear el tipo de formulario
export type NoteFormData = Pick<Note, "content">;

// 4. volver al formuylario a tipar los initial values

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

  // TODO: AGREGAR NOTAS A TASKSCHEMA

  // SERA UN ARRAY DE NOTESSCHEMAS
  // QUE ES UN OBJETO DEFINIDO ARRIBA Y SE LE AGREGA CREATEDBY
  // A SU VEZ CREATEDBY ES UN USUARIO Y LO TIPAMOS CON EL USERSCHEMA
  notes: z.array(
    noteSchema.extend({
      createdBy: userSchema,
    })
  ),
  updatedAt: z.string(),
  // TODO: OR NULL ZOD
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusSchema,
    })
  ),
});

export const taskProjectSchema = tasksSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,

});

export type Task = z.infer<typeof tasksSchema>;

// definimos un nuevo tipo para el form doonde solo usaremos description y name de momento y lo hacemos con Pick
export type TaskFormData = Pick<Task, "description" | "name">;

export type TaskProject = z.infer<typeof taskProjectSchema>;

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
  // tomamos del userschema y ese sera el tipado por que en proyecto viene como manager un id de usuario
  manager: z.string(userSchema.pick({ _id: true })),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
});

// TODO: VALIDACION DE RESPUESTA HTTP CON ZOD 2
export const dashboardSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);

export const editProjectSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
})
export type Project = z.infer<typeof projectSchema>;

// el pick es para deciddir que campos ocuparemos solamente ENTONES PICK DE DE PROUECT SOLO CLIENTNAME Y PROJECTNAME Y DESCRIPTION
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;

// TEAM

// VER QUE DEVUELVE LA RESPUESTA DE API PARA SABER

export const teamMemberSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);

export type TeamMember = z.infer<typeof teamMemberSchema>;

export type TeamMemberForm = Pick<TeamMember, "email">;

import { z } from "zod";

// TASKS

// definimos los status de las tareas que iran ene l schema
export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

// CREAMOS EL ESQUEMA A USAR EN EL ORMGULARIO DE CREACION DE TAREAS
export const tasksSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  // aqui le pasamos el taskstatus
  status: taskStatusSchema,
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

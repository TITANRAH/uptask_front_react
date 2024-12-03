import { Task, TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateStatus } from "@/api/TaskApi";
import { useParams } from "react-router-dom";

interface Props {
  tasks: TaskProject[];
  canEdit: boolean;
}

function TaskList(props: Props) {
  const { tasks, canEdit } = props;

  //TODO: REDUCE 2 PARA INFORMARLE AL REDUCE QUE EL ACCUMULADOR SERA UN OBJETO CON CLAVES DE TIPO STRING Y VALORES DE TIPO ARRAY DE TAREAS

  interface GroupedTasks {
    [key: string]: TaskProject[];
  }

  // AQUI CREAMOS EL OBJETO

  const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
  };

  const statusColors: { [key: string]: string } = {
    pending: "border-orange-300",
    onHold: "border-yellow-300",
    inProgress: "border-blue-300",
    underReview: "border-cyan-300",
    completed: "border-green-300",
  };

  // este código agrupa las tareas por su estado, creando un objeto donde cada clave es un estado y cada valor es un array de tareas que tienen ese estado.
  //TODO: REDUCE 1
  //    definimos que las tareas usaran reduce que sera de tipo string y un array de tareas
  //    podriamos decir que las tareas se reduciran a un objeto que tendra un string y un array de tareas

  // AQUI DEFINIMOS QUE LO QUE DEVOLVERA SERA ESTO <Record<string, Task[]>> QUE ES UN OBJETO QUE TENDRA UNA CLAVE DE TIPO STRING Y UN ARRAY DE TAREAS
  // Y LE PASAMOS UN CALLBACK QUE RECIBE UN ACCUMULADOR Y UNA TAREA Y DEVOLVERA UN OBJETO CON LA CLAVE DE LA TAREA Y EL ACCUMULADOR

  // let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
  // Aquí se está creando una variable llamada currentGroup, que se usa para agrupar las tareas con el mismo status.
  // acc[task.status]: Verifica si ya existe una propiedad en el acumulador (acc) con la clave correspondiente al valor de task.status.
  // Si ya existe (acc[task.status] es verdadero), se hace una copia del array de tareas con ese status usando el operador spread [...].
  // Si no existe (acc[task.status] es falso o undefined), entonces se inicializa currentGroup como un array vacío ([]).
  const groupedTasks = tasks.reduce<Record<string, TaskProject[]>>((acc, task) => {
    // si hay grupo para task.status entonces copia el grupo de tareas de ese status
    // si no crea un array vacio

    // si no existe tareas para el estaut currentGroup sera un array vacio
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    console.log("currentGroup", currentGroup);
    // agrega la tarea al grupo de tareas de ese status
    currentGroup = [...currentGroup, task];

    // retorna un objeto con la tarea y el grupo de tareas
    return { ...acc, [task.status]: currentGroup };

    // Y AQUI SE RETORNA COMO VALOR INICIAL DEL REDUCE EL OBJETO QUE CREAMOS AL PRINCIPIO
  }, initialStatusGroups);

  // TODO: REDUCE EJEMEPLO 1
  // Dado un array de palabras, usa reduce para contar cuántas veces aparece cada palabra.

  // const words = ['apple', 'banana', 'apple', 'orange', 'banana'];

  // const groupWords = words.reduce<Record<string, number>>((acc, word) => {

  //   // si la palabra existe en el arreglo entonces sumale 1
  //   // si no es 1
  //   // acc[word] es consierado como de tipo thrusty o falsy
  //   // por eso puedo sumarle un numero
  //   if( acc[word] ){
  //     acc[word] = acc[word] + 1
  //   } else {
  //     acc[word] = 1
  //   }

  //   return acc

  // }, {})

  // console.log("groupWords", groupWords);

  console.log("groupedTasks", groupedTasks);

  // TODO: REDUCE EJEMEPLO 2
  // Dado el arreglo [1, 2, 3, 1, 2, 1], usa reduce para contar cuántas veces aparece cada número.

  // const numbers = [1, 2, 3, 1, 2, 1]

  // const groupedNumbers = numbers.reduce<Record<number, number>>((acc, number) => {

  //   if(acc[number]){
  //     acc[number] = acc[number] + 1
  //   } else {
  //     acc[number] = 1
  //   }

  //   return acc
  // }, {})

  // console.log('numbers', groupedNumbers);

  //TODO: REDUCE EJEMPLO 3

  // const words = ["apple", "banana", "apple", "orange", "banana"];

  // const groupWordsMore5 = words.reduce<string[]>((acc, word) => {
  //   if (word.length > 5 && !acc.includes(word)) {
  //     acc.push(word);
  //   }

  //   return acc;
  // }, []);

  // console.log("groupWordsMore5", groupWordsMore5);

  // TODO: REDUCE EJEMPLO 4 EL QUE MAS CLARO ME QUEDO

  // interface Product {
  //   name: string;
  //   price: number;
  //   category: string;
  // }

  // interface GroupedProducts {
  //   [key: string]: Product[];
  // }

  // const initialValueGroupedProducts: GroupedProducts = {
  //   Fruit: [],
  //   Vegetable: [],
  // };

  // const products: Product[] = [
  //   { name: "Apple", price: 1.2, category: "Fruit" },
  //   { name: "Banana", price: 0.5, category: "Fruit" },
  //   { name: "Carrot", price: 0.7, category: "Vegetable" },
  //   { name: "Broccoli", price: 1.5, category: "Vegetable" },
  //   { name: "Orange", price: 1.1, category: "Fruit" },
  //   { name: "Potato", price: 0.8, category: "Vegetable" },
  // ];

  // const groupedProducts = products.reduce<Record<string, Product[]>>(
  //   (acc, product) => {

  // acc guarda el valor acumulado
  //     // si existe un grupo para la categoria de la fruta entonces copia el grupo de frutas de esa categoria
  //     // si no crea un array vacio
  //     let currentGroupedProduct = acc[product.category] ? [...acc[product.category]] : [];

  //     // agrega la fruta al grupo de frutas de esa categoria
  //     // esto es un array de frutas o vegetales dependiendo de la categoria
  //     currentGroupedProduct = [...currentGroupedProduct, product];

  //     // retorna un objeto con la fruta y el grupo de frutas
  //     // el ...acc mantiene el estado anterior de cada iteracion
  //     // por lo que agregamos al objeto el grupo anterior y el que nuevo por cada iteracion
  //     return { ...acc, [product.category]: currentGroupedProduct };

  //   },
  //   initialValueGroupedProducts
  // );

  // console.log("grpupedFruits", groupedProducts);

  // TODO: REDUCE EJEMPLO 5 OTRO QUE ME QUEDO MUY CLARO

  // const numeros = [1, 2, 3, 1, 2, 1];

  // const numerosSumados = numeros.reduce((acc, numero) => {

  // primera itearcion

  // acc = 0 + 1 = 1

  // segunda iteracion

  // acc = 1 + 2 = 3

  // tercera iteracion

  // acc = 3 + 3 = 6

  // cuarta iteracion

  // acc = 6 + 1 = 7

  // quinta iteracion

  // acc = 7 + 2 = 9

  // sexta iteracion

  // acc = 9 + 1 = 10
  //   console.log("acc", acc);
  //   const suma = acc + numero;
  //   console.log("suma", suma);
  //   return suma;
  // }, 0);  // Aquí estamos comenzando con acc = 0

  // console.log("Resultado final:", numerosSumados);

  const queryClient = useQueryClient();

  const params = useParams();
  const projectId = params.projectId!;

  console.log("projectId", projectId);

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      // queryClient.invalidateQueries({ queryKey: ["task", active.id] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });

  const handleDragEnd = (e: DragEndEvent) => {
    console.log("drag end", e);

    const { active, over } = e;

    console.log("active", active.id);

    // determino si arrastro hacia un elemento valido
    // si es valido entonces actualizo el estado de la tarea
    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      console.log("taskId", taskId);
      console.log("status", status);

      // TODO: DRAGABLE 4

      // EL TASKID ES EL ID DEFINIDO EN TASKCARD LINEA 20 POR QUE AQUI NO TENEMOS OPCION DE TEN ER ESE ID
      // PERO SI LO TENEMOS EN EL ACTIVE.ID DE DRAGABLE
      // GRACIAS A PONERLO EN EL CONTEXT <DndContext onDragEnd={handleDragEnd}> ACA ABAJO
      // EL PROJECTID ESTA EN LOS PARAMS
      // Y EL STATUS ES EL STATUS QUE SE LE PASA AL DROP TASK LINEA 11 COMO ID POR ESO PODEMOS LEERLO ACA
      // POR MEDIO DE OVER.ID

      // EN RESUMEN

      // 1. INSTALAMOS DRAGABLE DND
      // 2. CREAMOS UN COMPONENTE PARA ARRASTRAR LOS ELEMENTOS LLAMADO DROP TASK
      // 3. EN DROP TASK USAMOS useDroppable PARA HACERLO ARRASTRABLE
      // 4. EN ESE USEDROPABLE DEFINIMOS QUE EL ID SERA EL STATUS QUE RECIBE EL COMPONENTE COMO PROPS
      // Y QUE SE DEFINE ACA EN LA LINEA 287 O BUSCAR MAS ABAJO
      // 5. ACA EN ESTE COMPONENTE DE TASKLIST DEFINIMOS EL CONTEXTO QUE NECESITA DRAGABLE
      // 6. DEFIMIMOS UNA FUNCION PARA ONDRAGEND QUE TOMARA EL EVENTO Y TRAERA DOS ELEMENTOS IMPORTANTES
      // EL ACTIVE QUE ES EL ELEMENTO QUE SE ESTA ARRASTRANDO Y EL OVER QUE ES EL ELEMENTO SOBRE EL QUE SE ESTA ARRASTRANDO
      // 7. SI EL OVER ES VALIDO ENTONCES ACTUALIZAMOS EL ESTADO DE LA TAREA
      // LLAMANDO A LA MUTACION QUE PIDE PROJECTID (URL) TASKID (ID DE LA TAREA QUE ESTA EN EL ACTIVE ID ) Y STATUS (STATUS DE LA TAREA QUE ESTA DEFINIDO EN DROP TASK COMO ID UNICO)
      mutate({ projectId, taskId, status });

      // auery optimista es para no esperar el tiempoq eu toma en cambiar de columna al arrastrar

      // TODO: SETQUERYDATA
      // https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientsetquerydata
      // https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates#optimistic-updates
      // ESTO IDENTIFICA LA TAREA QUE ESTOY CAMBIANDO
      // Y ENVIAMOS LA MUTACION
      // PERO EN VEZ DE ESPERAR QUE INVALIDEN LOS QUERYS
      // Y QUE SE HAGA LA PETICION LO HACEMOS INMEDIATO
      // POR ESO SE LLAMA OPTIMISTA
      queryClient.setQueryData(["project", projectId], (prevData: { tasks: Task[] }) => {
        console.log("prevData", prevData);

        const updatedTasks = prevData.tasks.map((task) => {
          // si la tarea recorrida es igual al id del active
          if (task._id === taskId) {
            // retorna la copia tarea con el nuevo status que es el over.id
            return {
              ...task,
              status,
            };
          }

          // si no es igual al id del active entonces retorna la tarea sin cambios
          return task;
        });

        // retorna el objeto prevData con las tareas actualizadas

        return {
          ...prevData,
          tasks: updatedTasks,
        };
      });
    }
  };

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {/* TODO: DRAGABBLE 3 ESPECIFICAR EL CONTEXT EN ESTE CASO EN TODO LO QUE ES LA CARD DE TASK 
       AQUI SE ESECIRFICA QUE SERA EL CONTEXTO DE DRAGAABLE */}
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-light border ${statusColors[status]} bg-white p-3 border-t-8`}
              >
                {statusTranslations[status]}{" "}
              </h3>

              <DropTask status={status} />

              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard canEdit={canEdit} key={task._id} task={task} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}

export default TaskList;

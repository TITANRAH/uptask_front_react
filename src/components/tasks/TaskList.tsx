import { Task } from "@/types/index";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
}

function TaskList(props: Props) {
  const { tasks } = props;

  //TODO: REDUCE 2 PARA INFORMARLE AL REDUCE QUE EL ACCUMULADOR SERA UN OBJETO CON CLAVES DE TIPO STRING Y VALORES DE TIPO ARRAY DE TAREAS

  interface GroupedTasks {
    [key: string]: Task[];
  }

  // AQUI CREAMOS EL OBJETO

  const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
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
  const groupedTasks = tasks.reduce<Record<string, Task[]>>((acc, task) => {
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

  

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskList;

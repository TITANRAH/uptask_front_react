import { deleteTask } from "@/api/TaskApi";
import {  TaskProject } from "@/types/index";
import { useDraggable } from "@dnd-kit/core";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  task: TaskProject;
  canEdit: boolean;
}
function TaskCard(props: Props) {
  const { task, canEdit } = props;

  // TODO DRAGABBLE

  // EL ID DE LA TAREA ES NECESARIO PARA QUE SEPA QUE TAREA SE ESTA MOVIENDO
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    //aquí le pasamos el id de la tarea para que sepa que es lo que se esta moviendo
    id: task._id,
  });
  const navigate = useNavigate();
  //TODO PARAMS SON SIN ? LOS QUE LLEVEN ? SON QUERY PARAMS
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);

      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });

  const handleDeleteTask = async () => {
    const data = {
      projectId,
      taskId: task._id,
    };

    mutate(data);
  };

  // TODO: DRAGABLE 2
  // necesitamos pasarle una propiedad css para mover el elemento de ixiquierda a derecha
  // que canrtidad??? lo que tenga transform en pixeles
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        padding: "1.25rem",
        backgroundColor: "#FFF",
        width: "400px",
        display: "flex",
        borderWidth: "1px",
        borderColor:'rgb(203 213 225 / var(--tw-ring-opacity))',
      }
    : undefined;

  return (
    <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
      <div
        // TODO: DRAGABLE 3
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        style={style}
        className="min-w-0 flex flex-col gap-y-4"
      >
        <p className="text-xl font-bold text-slate-600 text-left">
          {task.name}
        </p>

        <p className="text-slate-500 ">{task.description}</p>
      </div>

      <div>
        <div className="flex shrink-0  gap-x-6">
          <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span className="sr-only">opciones</span>
              <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  <button
                    onClick={() =>
                      navigate(location.pathname + `?viewTask=${task._id}`)
                    }
                    type="button"
                    className="block px-3 py-1 text-sm leading-6 text-gray-900"
                  >
                    Ver Tarea
                  </button>
                </Menu.Item>

                {canEdit && (
                  <>
                    <Menu.Item>
                      <button
                        onClick={() =>
                          navigate(location.pathname + `?editTask=${task._id}`)
                        }
                        type="button"
                        className="block px-3 py-1 text-sm leading-6 text-gray-900"
                      >
                        Editar Tarea
                      </button>
                    </Menu.Item>

                    <Menu.Item>
                      <button
                        type="button"
                        onClick={() => handleDeleteTask()}
                        className="block px-3 py-1 text-sm leading-6 text-red-500"
                      >
                        Eliminar Tarea
                      </button>
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </li>
  );
}

export default TaskCard;

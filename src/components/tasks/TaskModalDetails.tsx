import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { formateDate, useQueryParams } from "@/utils/index";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateStatus } from "@/api/TaskApi";
import { toast } from "react-toastify";
import { statusTranslations } from "@/locales/es";
import { TaskStatus } from "@/types/index";
import NotesPanel from "../notes/NotesPanel";

export default function TaskModalDetails() {
  const params = useParams();

  const projectId = params.projectId!;

  const taskId = useQueryParams("viewTask");

  console.log("viewTask :>> ", taskId);

  const show = taskId ? true : false;

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isError, error } = useQuery({
    // cada vez que taskid sea diferente hara consultas diferentes
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
  });
  console.log("data :>> ", data);

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });

  const handleChangeStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(e.target.value);

    // TODO:// CREAR UN TYPE NUEVO PARA EL STATUS
    const status = e.target.value as TaskStatus;
    const data = {
      projectId,
      taskId,
      status,
    };

    console.log(data);

    mutate(data);
  };

  // TODO: DOBLE RENDER REACT

  // APARECE DOS VECES POR EL DOBLE RENDER DE REACCT PERO ESTA LINEA DE CODIO NO APAFECE
  if (isError) {
    toast.error(error.message, { toastId: "error" });
    return <Navigate to={`/projects/${projectId}`} />;
  }

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navigate(location.pathname, { replace: true })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">
                      Agregada el: {formateDate(data.createdAt)}{" "}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formateDate(data.updatedAt)}{" "}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      Descripción: {data.description}
                    </p>

                    {data.completedBy.length > 0 ? (
                      <>
                        <p className="text-1xl underline font-bold uppercase text-slate-500 mb-2">
                          Historial de cambios
                        </p>

                        <ul className="list-decimal">
                          {data.completedBy.map((activityLog) => (
                            <li key={activityLog._id}>
                              <span className="font-bold mr-2 text-slate-600">
                                {statusTranslations[activityLog.status]}
                              </span>
                              por: {activityLog.user.name.toUpperCase()}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    <div className="my-5 space-y-3">
                      <label className="font-bold">
                        Estado Actual: {data.status}
                      </label>

                      <select
                        className="w-full p-3 bg-white border border-gray-300"
                        onChange={handleChangeStatus}
                        defaultValue={data.status}
                      >
                        {
                          //TODO: OBJECTS.ENTRIES
                          // mirar el objecto y entender por que se hace asi
                          // el key se nevia al servidor como el valor seleccionado pero el value del objeto es que el ve el usuario
                          Object.entries(statusTranslations).map(
                            ([key, value]) => (
                              <option value={key} key={key}>
                                {value}
                              </option>
                            )
                          )
                        }
                      </select>
                    </div>

                    <NotesPanel notes={data.notes}/>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}

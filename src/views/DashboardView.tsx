import {  getProjects } from "@/api/ProjectApi";
import ButtonNavProject from "@/components/ButtonNavProject";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { isManager } from "../utils";
import DeleteProjectModal from "@/components/projects/DeleteModalProject";

function DashboardView() {
  const { data: user, isLoading: loading } = useAuth();
  const navigate = useNavigate()
  const { data, isError, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });



  



  if (isLoading && loading) return "Cargando...";
  console.log(isError);
  console.log(isLoading);
  console.log("data :>> ", data);

  // TODO: COLABORADORES O MANAGER

  // COMO VIENE UN ID DE MANAGAER PODEMOS SABER SI ES MANAGER O NO CONSLTANDO POR LOS PROYECTOS
  // SI EL ID DEL MANAGER ES IGUAL AL ID DEL USUARIO ENTONCES ES MANAGER
  // SI NO ES COLABORADOR

  if (data && user)
    return (
      <>
        <ButtonNavProject
          textButton="Nuevo Proyecto"
          textTitle="Mis Proyectos"
          textSubtitle="Maneja y administra tus proyectos"
          to="/project/create"
        />

        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data.map((project) => (
              <li
                key={project._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <div className="mb-2">
                      {isManager(project.manager, user._id) ? (
                        <p className="font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5">
                          Manager
                        </p>
                      ) : (
                        <p className="font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5">
                          Colaborador
                        </p>
                      )}
                    </div>
                    <Link
                      to={`/project/${project._id}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
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
                          <Link
                            to={`/project/${project._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Ver Proyecto
                          </Link>
                        </Menu.Item>

                        {isManager(project.manager, user._id) && (
                          <>
                            <Menu.Item>
                              <Link
                                to={`/project/${project._id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Editar Proyecto
                              </Link>
                            </Menu.Item>

                            <Menu.Item>
                              <button
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-red-500"
                                onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                              >
                                Eliminar Proyecto
                              </button>
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            No hay proyectos aún
            <Link className="text-fuchsia-500 font-bold" to="/project/create">
              Crear Proyecto
            </Link>
          </p>
        )}

        <DeleteProjectModal/>
      </>
    );
}

export default DashboardView;

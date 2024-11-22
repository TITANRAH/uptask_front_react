import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO: ROUTER 
        element es el componente a renderizar
        */}
        {/* este es el layout principal */}
        <Route element={<AppLayout />}>
          {/* el index indica que sera la pagina principal al visitar la ruta / */}
          {/* TODO: REACT ROUTER DOM 1 
            PARA QUE SE REDENRIZE EL HIJO EN ESTE CASO DASHBOARDVIEW HAY QUE IMPORTAR OUTLET EN EL SIGUIENTE TODO 
            */}
          <Route path="/" element={<DashboardView />} index />
          //TODO: CREAR OTRA RUTA
          {/* USO LINK DE REACT DOM ROUTER PARA REDIRECCIONAR A LA RUTA /project/create
            PERO DEBO DECLÑARARLA ACA Y AL COMPPONENTE QUYE LLEVARA */}
          <Route path="/project/create" element={<CreateProjectView />} index />
          <Route path="/project/:projectId" element={<ProjectDetailsView />} index />
          <Route path="/project/:projectId/edit" element={<EditProjectView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

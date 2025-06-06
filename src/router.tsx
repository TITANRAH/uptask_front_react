import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPassword from "./views/auth/NewPassword";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./views/404/NotFound";

// TODO: RUTAS REACT
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
          <Route path="/project/create" element={<CreateProjectView />} />
          <Route path="/project/:projectId" element={<ProjectDetailsView />} />
          <Route
            path="/project/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/project/:projectId/team"
            element={<ProjectTeamView />}
          />
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route
              path="/profile/password"
              element={<ChangePasswordView />}
            />
          </Route>
        </Route>

        {/* segundo layout */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPassword />} />
        </Route>

            {/* TODO: 404 */}
            {/* SI NO SE CUMPLE NINGUNA DE LAS VISTAS ANTERIORES DEFINIDAS CAERA EN EL ASTERISCO */}
        <Route element={<AuthLayout  />}>
            <Route path="*" element={<NotFound />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

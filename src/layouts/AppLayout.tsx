import { Link, Navigate, Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import { NavMenu } from "@/components/NavMenu";
// TODO: TOASTIFY
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";

// TODO: REACT ROUTER DOM 2 AQUI LLAMAMOS A OUTLET PARA RENDERIZAR LOS COMPONENTES HIJOS

function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/auth/login" />;
  }
  
  // TODO: USANDO REACT QUERY


  // SIEMPRE DEBEMOS VALIDAR SI HAY DATA PARA RENDERIZAR EL COMPONENTE
  if(data) return (
    <>
      <header className="py-5 bg-gray-800">
        <div className="flex flex-col items-center justify-between mx-auto max-w-screen-2xl lg:flex-row">
          <div className="w-64">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <NavMenu name={data.name} />
        </div>
      </header>

      <section className="p-5 mx-auto mt-10 max-w-screen-2xl ">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservado {new Date().getFullYear()}
        </p>
      </footer>

      {/* llamamos toast container */}
      <ToastContainer
        position="top-right"
        pauseOnHover={false}
        // autoClose={5000}
        // hideProgressBar
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        pauseOnFocusLoss={false}
        draggable
      />
    </>
  );
}

export default AppLayout;

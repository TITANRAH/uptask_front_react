import Logo from "@/components/Logo";
import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="py-10 lg:py-20 mx-auto w-[450px]">

          <Logo/>
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>

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
};

export default AuthLayout;

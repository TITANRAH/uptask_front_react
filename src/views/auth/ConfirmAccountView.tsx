import { confirmAccount } from "@/api/AuthApi";
import TitleForm from "@/components/TitleForm";
import { ConfirmToken } from "@/types/index";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  //TODO: PININPUT 1
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
        console.log('error desde confirm account component', error);
        
        toast.error(error.message);
      
      },
    onSuccess: (data) => {
       toast.success(data);
    },
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  //TODO: PININPUT 2
  //   cuando se escribe el ultimo digito tendremos la hilera de numeros finales
  const handleComplete = (token: ConfirmToken["token"]) => {
    console.log("token ->", token);

    mutate({ token });
  };

  return (
    <>

      <TitleForm
        titleH1="Confirma tu Cuenta"
        titleP="Ingresa el código que recibiste"
        titleSpan="por e-mail"
      />
      
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>

        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}

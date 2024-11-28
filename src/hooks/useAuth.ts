// TODO: CREACION DE HOOK

// EN ESTE CASO ES PARA OBTENER EL USUARIO AUTENTICADO 
// DEBMOS DECLARRLO EN TSCONFIG PARA EL @

import { getUser } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    // ESTA OPCION DESHABILITA EL COMORTAMIONETO POR DEFECTO QUE TIENE AL TENER 2 PESTAÑAS ABVIERTAS Y CAMBIAR ENTRE PESTAÑAS 
    // PASABA QUE HACE UN FETCH PR DEFECTO Y BNO HAY NECESIDAD DE ELLO
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
}

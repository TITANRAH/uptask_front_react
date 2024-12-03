import { useLocation } from "react-router-dom";
import { Project, TeamMember } from "../types";

export function useQueryParams(paramGet: string) {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const paramSearch = queryParams.get(paramGet)!;

  console.log("paramSearch :>> ", paramSearch);

  return paramSearch;
}

// TODO: FECHAS FORMATEADOR DE ISOSTRING
// tomara una fecha iso string y dvolvera un string

export function formateDate(isoString: string): string {
  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
}

export const isManager = (managerId: Project['manager'], userId: TeamMember['_id'] ) => {
  return managerId === userId;
}
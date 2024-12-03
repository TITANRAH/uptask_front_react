import { addUserToProject } from "@/api/TeamApi";
import { Project, TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


interface Props {
  user: TeamMember;
  projectId: Project["_id"];
  reset: () => void;
}

function SearchResult(props: Props) {
  const { user, projectId, reset } = props;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({queryKey: ["projectTeam", projectId]});
      reset()
    },
  
  });

  const handleAddUserToTeam = () => {
    const data = { projectId, id: user._id };

    mutate(data);
  };

  if (user)
    return (
      <>
        <p className="mt-10 text-center font-bold">Resultado:</p>
        <div className="flex justify-between items-center">
          <p>{user.name}</p>
          <button
            className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
            onClick={handleAddUserToTeam}
          >
            Agregar al proyecto
          </button>
        </div>
      </>
    );
}

export default SearchResult;

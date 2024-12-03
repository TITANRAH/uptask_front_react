// TODO: DRAGABLE AQUI SE HACE EL DROP
import { useDroppable } from "@dnd-kit/core";

interface Props {
  status: string;
}

function DropTask(props: Props) {
  const { status } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const style = {
    opacity: isOver ? 0.3 : undefined,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="text-xs font-semibold uppercase p-2 border border-dashed  border-slate-600  mt-5 grid place-content-center text-slate-500"
    >
      Soltar tarea aquí
    </div>
  );
}

export default DropTask;

import { Task } from "@/types/index";


interface Props {
    task: Task;
}
function TaskCard(props: Props) {

    const { task } = props;
    
  return (
    <div>{task.name}</div>
  )
}

export default TaskCard
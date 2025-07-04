import { useTasks } from "@/shared/hooks/task"

export default function TasksList(){
    const {loading, data, error} = useTasks()

    console.log('adata-=-=-=', data);

    return (
        <></>
    )
}
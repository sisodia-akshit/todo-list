import { useEffect, useState } from 'react'
import Model from './Model'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTodoById, updateTodo } from '../../services/todoApi'
import { getDate } from '../../util/getDate';

function ModelReadTodo({ id, onClose, setToast }) {
    const queryClient = useQueryClient();

    const [tasks, setTasks] = useState([])
    const [showUpdate, setShowUpdate] = useState(false)

    const { data, isLoading, error } = useQuery({
        queryKey: ["TodoData"],
        queryFn: () => getTodoById({ id }),
        keepPreviousData: true,
    })
    const todoData = data ?? {}

    const updateTodoMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todo"])
            setShowUpdate(false)
            onClose()
            setToast("Todo List Updated successfully")
            setTimeout(() => {
                setToast("")
            }, 1500)
        }
    })

    const updateTaskHandler = () => {
        updateTodoMutation.mutate({ id, tasks })
    }

    useEffect(() => {
        setTasks(todoData.tasks)
    }, [todoData])

    if (isLoading) return <h1>Loading...</h1>
    if (error) console.log(error)
    return (
        <Model onClose={onClose}>

            <h1 className='marginNot'>{todoData?.heading}</h1>
            <h3 style={{ margin: 0, fontWeight: 500 }}>{todoData?.subHeading}</h3>
            <p style={{ margin: 0, color: "#777" }}>{getDate(todoData?.deadline)}</p>
            <h2>Tasks</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {todoData?.tasks?.length > 0 && tasks?.map((curr, i) => {
                    return (
                        <li key={i} style={{ display: "flex", marginTop: "1rem", gap: "1rem" }}>
                            <input type="checkbox" checked={curr?.isCompleted} onChange={e => { setTasks(prev => prev.map((item, index) => i === index ? { ...item, isCompleted: e.target.value === "on" } : item)); setShowUpdate(true); }} />
                            <h3 style={{ textTransform: "capitalize", fontWeight: 500, margin: 0 }}>{curr.task}</h3>
                        </li>
                    )
                })}
            </ul>

            {showUpdate && <button type='button' onClick={updateTaskHandler} className='button'>Update</button>}


        </Model>
    )
}

export default ModelReadTodo
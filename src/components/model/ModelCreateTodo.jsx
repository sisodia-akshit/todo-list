import { useState } from 'react';
import Model from './Model'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../../services/todoApi';

function ModelCreateTodo({ onClose, setToast }) {
    const [heading, setHeading] = useState("")
    const [subHeading, setSubHeading] = useState("")

    const [tasks, setTasks] = useState([{ task: "", isCompleted: false }])

    const [deadline, setDeadline] = useState("")
    const [deadlineRemainder, setDeadlineRemainder] = useState(5)

    const queryClient = useQueryClient()


    const createTodoMutation = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todo"])
            onClose()
            setToast("New Todo List Added")
            setTimeout(() => {
                setToast("")
            },500)
        }
    })

    const removeTaskHandler = () => {
        if (tasks.length < 2) return
        setTasks(prev => prev.filter((curr, i) => i !== tasks.length - 1))

    }

    const getDeadlineRemainderDate = (date) => {
        const newDate = new Date(date)
        const data = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate() - deadlineRemainder}`
        return (new Date(data))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formateDeadline = new Date(deadline)
        const newDeadlineRemainder = getDeadlineRemainderDate(deadline)
        const data = {
            heading: heading.trim(),
            subHeading: subHeading.trim(),
            tasks,
            deadline: formateDeadline,
            deadlineRemainder: newDeadlineRemainder
        }
        createTodoMutation.mutate(data)

        setHeading("")
        setSubHeading("")
        setTasks([{ task: "", isCompleted: false }])
        setDeadline("")
        setDeadlineRemainder(5)
    }
    return (
        <Model onClose={onClose} width="100%">
            <form onSubmit={onSubmitHandler} className='model-createtodo'>
                <h1>Create New</h1>
                <label htmlFor="todo-heading">Heading</label>
                <input required type="text" name='todo-heading' value={heading} onChange={(e) => setHeading(e.target.value)} maxLength={50} style={{ width: "fit-content" }} />
                <br />

                <label htmlFor="todo-sub-heading">Sub Heading</label>
                <input required type="text" name='todo-sub-heading' value={subHeading} onChange={(e) => setSubHeading(e.target.value)} maxLength={40} style={{ width: "fit-content" }} />
                {/* <br /> */}

                <h2 style={{ margin: "0", marginTop: 15 }}>Add Task</h2>
                {/* list task  */}
                <ul className="todo-list-task">
                    {
                        tasks?.map((curr, i) => {
                            return (
                                <li key={i}>
                                    <label htmlFor="todo-task">Task{i != 0 && (i + 1)}</label>
                                    <input required type="text" name='todo-task' value={curr?.task} onChange={e => setTasks(prev => prev.map((item, index) => index === i ? { ...item, task: e.target.value } : item))} />
                                </li>
                            )
                        })

                    }
                </ul>
                <br />
                <div style={{ display: "flex" }} >
                    {tasks.length > 1 && <button type='button' className="model-createtodo-addTask-button" onClick={removeTaskHandler} >Remove</button>}
                    <button type='button' className="model-createtodo-addTask-button" onClick={() => setTasks(prev => [...prev, { task: "", isCompleted: false }])} >Add Task +</button>
                </div>

                <h2 style={{ margin: "0", marginTop: 15 }}>Add Deadline</h2>
                <br />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr)", gap: "2rem" }} >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="todo-deadline">Deadline Date</label>
                        <input required type="date" name={"todo-deadline"} value={deadline} onChange={e => setDeadline(e.target.value)} style={{ width: "fit-content" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="todo-deadline">Deadline Reminder (in days)</label>
                        <input required type="number" name={"todo-deadline"} value={deadlineRemainder} onChange={e => setDeadlineRemainder(e.target.value)} style={{ width: "fit-content" }} max={28} />
                    </div>
                </div>
                <br />
                <button type='submit' className='model-createtodo-button'>Create</button>
            </form>
        </Model>
    )
}

export default ModelCreateTodo
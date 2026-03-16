
function TaskInput({ index, value, setTask }) {
    const inputChangeHandler = (e) => {
        setTask(prev => ({
            ...prev,
            task: e.target.value
        }))
    }
    return (
        <>
            <label htmlFor="todo-task"  style={{ color: "#555" }}>Task{index != 0 && (index + 1)}</label>
            <input type="text" name='todo-task' value={value.task} onChange={inputChangeHandler} />
        </>
    )
}

export default TaskInput
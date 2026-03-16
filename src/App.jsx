import { useState } from 'react';
import ListTodo from './components/common/ListTodo';
import ModelCreateTodo from './components/model/ModelCreateTodo';
import './styles/dashboard.css'
import { useQuery } from '@tanstack/react-query';
import { getTodo } from './services/todoApi';
import ModelReadTodo from './components/model/ModelReadTodo';
import './styles/App.css'

import { FaCalendar, FaPlus } from "react-icons/fa";
import { getPendingTask } from './util/getPendingTask';
import { getDeadline } from './util/getDeadLine';
import { getDate } from './util/getDate';
import Toast from './components/ui/Toast';

function App() {
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openById, setOpenId] = useState(null);
  const [toast, setToast] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["todo"],
    queryFn: () => getTodo(),
    keepPreviousData: true,
  })
  const todo = data ?? []

  const inProgress = todo.filter(curr => {
    const deadline = getDeadline(curr?.deadline)
    const pendingTask = getPendingTask(curr?.tasks)
    if (!(new Date() > deadline) && pendingTask?.length > 0) return curr
  });

  const deadlineCrossed = todo.filter(curr => {
    const deadline = getDeadline(curr?.deadline)
    const pendingTask = getPendingTask(curr?.tasks)
    if (new Date() > deadline && pendingTask?.length > 0) return curr
  })

  const completed = todo.filter(curr => {
    const pendingTask = getPendingTask(curr?.tasks)
    if (pendingTask?.length === 0) return curr
  })

  if (isLoading) return <h1>Loading...</h1>
  if (error) console.log(error)
  return (
    <section className="dashboard">
      {/* head  */}
      <div className="dashboard-top">
        <h2 className='marginNot'>Welcome</h2>
        <p className='marginNot'><FaCalendar /> {getDate(new Date())}</p>
      </div>
      {/* Create */}
      <div className="dashboard-create">
        <h3 className='marginNot'>To-do</h3>
        <button type='button' className='button' onClick={() => setOpen(true)}><FaPlus />&nbsp;New template</button>
      </div>
      {/* main  */}
      <div className="dashboard-main">
        {todo.length === 0 &&
          <div className="emptyList">
            <h3>Click "Create" to make a Todo List!</h3>
            <button type='button' className='dashboard-Create-button' onClick={() => setOpen(true)}>Create </button>
          </div>
        }
        {deadlineCrossed.length > 0 && <ListTodo name="Deadline Crossed" bgcolor="rgba(255, 0, 0, 0.1)" color="rgb(200, 0, 0)" totalCard={deadlineCrossed.length} data={deadlineCrossed} open={() => setOpenTask(true)} setId={setOpenId} />}
        {inProgress.length > 0 && <ListTodo name="In Progress" totalCard={inProgress.length} data={inProgress} open={() => setOpenTask(true)} setId={setOpenId} />}
        {completed.length > 0 && <ListTodo name="Completed" totalCard={completed.length} data={completed} open={() => setOpenTask(true)} setId={setOpenId} isCompleted={true} />}
      </div>
      {/* Create Model  */}
      {open && <ModelCreateTodo onClose={() => setOpen(false)} setToast={setToast} />}
      {/* Read Model  */}
      {openTask && <ModelReadTodo id={openById} onClose={() => setOpenTask(false)} setToast={setToast} />}

      {/* show Toast  */}
      {toast && <Toast>{toast}</Toast>}

    </section>
  )
}

export default App

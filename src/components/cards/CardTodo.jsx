import { FaList, FaTrash } from "react-icons/fa";
import Button from "../common/Button";
import ModelDelete from "../model/ModelDelete";
import { useState } from "react";
import { getDate } from "../../util/getDate";
import { getPendingTask } from "../../util/getPendingTask";
import { getLimitedString } from "../../util/getLimitedString";

function CardTodo({ data, bgcolor, color, open, setId, isCompleted }) {
    const [openDelete, setOpenDelete] = useState(false)

    const onCardClickedHandler = () => {
        open();
        setId(data?.id)
    }
    const isDeadLineApproaching = (data) => {
        const date = new Date(data);
        const today = new Date();

        return today > date
    }

    const completedTasks = data?.tasks?.filter(curr => curr.isCompleted === true)
    const progress = (completedTasks.length / data.tasks.length) * 100

    return (
        <div className="card-todo"  >
            {openDelete && <ModelDelete onClose={() => setOpenDelete(false)} id={data?.id} />}
            {/* top  */}
            <div className="card-todo-top">
                <div className="card-todo-headings">
                    <h3>{getLimitedString(data.heading, 20)}</h3>
                    <h4>{getLimitedString(data.subHeading, 20)}</h4>
                </div>
                <button type='button' className="trash-button" onClick={() => { setOpenDelete(true) }}>
                    <FaTrash className="trash" />
                </button>
            </div>
            {/* main  */}
            <div className="card-todo-main">
                <div className="card-todo-main-headings">
                    <div style={{ display: 'flex', gap: ".5rem" }}>
                        <FaList color="#999" />
                        <h4 style={{ color: "#999" }}>Progress</h4>
                    </div>
                    <p style={{ color: "#000" }}>{completedTasks?.length}/{data?.tasks?.length}</p>
                </div>
                <div className="card-todo-progress-bar" style={{ marginTop: "10px" }}>
                    <span className="empty-bar" style={{ width: "100%" }}></span>
                    <span className="fill-bar" style={isCompleted ? { width: `${progress}%`, background: "rgb(138, 230, 0)" } : { width: `${progress}%` }}></span>
                </div>
            </div>
            {/* bottom  */}
            <div className="card-todo-bottom">
                <div className="card-todo-deadline" style={isDeadLineApproaching(data?.deadlineRemainder) && getPendingTask(data?.tasks)?.length > 0 ? { backgroundColor: "rgba(255, 0, 0, 0.1)", color: "rgb(200, 0, 0)" } : { backgroundColor: `${bgcolor}`, color: `${color}` }}>
                    {getDate(data?.deadline)}
                </div>
                <button type='button' onClick={onCardClickedHandler} className='button'>View</button>
            </div>
        </div >
    )
}

export default CardTodo
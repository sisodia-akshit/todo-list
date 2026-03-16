import CardTodo from '../cards/CardTodo'

function ListTodo({ name, bgcolor, color, totalCard, data, open, setId, isCompleted, openDelete }) {
    return (
        <div className="list-todo" >
            {/* top  */}
            <div className="template-list-top">
                <h4 style={{ color: "#777" }}>{name}({totalCard})</h4>
            </div>
            {/* main  */}
            <div className="template-list-main">
                {data.map(curr => {
                    return <CardTodo bgcolor={bgcolor} color={color} key={curr.id} data={curr} open={open} setId={setId} isCompleted={isCompleted} openDelete={openDelete} />

                })}
            </div>

        </div>
    )
}

export default ListTodo
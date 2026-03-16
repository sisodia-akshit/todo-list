
import Model from './Model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodo } from '../../services/todoApi'

function ModelDelete({ onClose, id, setToast }) {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todo"])
            onClose();
            // setToast("Todo List Deleted successfully")
            // setTimeout(() => {
            //     setToast("")
            // }, 1500)
        }
    })

    const deleteButtonHandler = () => {
        deleteMutation.mutate({ id })
    }
    return (
        <Model onClose={onClose}>
            <p style={{ paddingTop: "1rem", textAlign: "center" }}>Click <b>"Delete"</b>  to Confirm Delete</p>
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
            }}>
                <button type='button' onClick={deleteButtonHandler} className='button' style={{ backgroundColor: "red" }} >Delete</button>
                <button type='button' onClick={onClose} className='button' >Cancel</button>

            </div>
        </Model>
    )
}

export default ModelDelete
import { FaCross } from "react-icons/fa"
import "../../styles/model.css"
import { FaCircleXmark } from "react-icons/fa6"

function Model({ onClose, width, children }) {
    return (
        <div className="model-container">
            <div className='model' style={{ width }}>

                <div className="model-children">
                    <button type='button' className="model-button-close" onClick={onClose} ><FaCircleXmark /></button>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Model
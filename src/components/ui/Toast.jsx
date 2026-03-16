import React from 'react'

function Toast({ children }) {
    return (
        <div className='toast' >
            <h4 className='marginNot'>{children}</h4>
        </div>
    )
}

export default Toast
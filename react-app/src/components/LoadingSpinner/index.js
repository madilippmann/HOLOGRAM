import React from 'react'

import spinner from '../../static/loading-sphere-colorbg.gif'
import './LoadingSpinner.css'

export default function LoadingSpinner() {
    return (
        <div id='loading-spinner-container'>
            <img
                src={spinner}
                alt="loading-spinner"
                id="loading-spinner"
            />

        </div>
    )
}

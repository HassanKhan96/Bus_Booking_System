import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import './css/Rides.css'

const LoaderComponent = ({ text, size}) => {
    return (
        <div className="loader">
            <CircularProgress color="primary" size={size} />
            <h2>{text}</h2>
        </div>
    )
}

export default LoaderComponent
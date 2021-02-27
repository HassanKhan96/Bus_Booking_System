import React, { useState } from 'react'
import './css/DetailInput.css'

const AddInput = ({ label, Value, onValueChange }) => {
    return (
        <div className="input-container">
                <div className="input-label">{label}</div>
                <div className="input-section">
                    <input 
                    type="Text" 
                    className="AddInput"
                    value={Value}
                    onChange={e => {
                        onValueChange(e.target.value)
                    }}
                    />
                </div>
        </div>
    )
}

export default AddInput
import React, { useState } from 'react'
import './css/DetailInput.css'

const DetailInput = ({ label, Value, isEditable ,onValueChange }) => {
    const [Editable, setEdit] = useState(isEditable)
    return (
        <div className="input-container">
                <div className="input-label">{label}</div>
                <div className="input-section">
                    <input 
                    type="Text" 
                    className="Input"
                    value={Value}
                    onChange={e => {
                        onValueChange(e.target.value)
                    }}
                    disabled={Editable}
                    />
                    <button className="Edit" onClick={e => setEdit(false)}>Edit</button>
                </div>
        </div>
    )
}

export default DetailInput
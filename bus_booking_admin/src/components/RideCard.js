import React from 'react'
import './css/RideCard.css'
import { useHistory, Link } from 'react-router-dom'


const RideCard = ({ data }) => {
    const History = useHistory()
    return (
        <div className="container-card" >
            <div className="location-card">{data.startLocation} To {data.dropLocation}</div>
            <div className="seats-card">Seats Remaining {data.seatsRemaining}</div>
            <div className="time-card">Time {data.pickUptime} to {data.dropTime}</div>
            <div className="ride-options">
                <button className="options-link" onClick={()=> { History.push({pathname:"/RideDetails", state: {Data: data}})}} >Ride Details</button>
                <button className="options-link" onClick={()=> { History.push({pathname:"/Bookings", state: {Data: data}})}}>Bookings</button>
            </div>
        </div>
    )
}

export default RideCard
import React from 'react'
import './css/BookingCard.css'
const BookingCard = ({ data, onPress }) => {
    const {uid} = data
    const renderImage = () => {
        if(data.hasOwnProperty("imageUrl")){
            return data.imageUrl
        }
        else {
            return require('../images/avatar2.jpg')
        }
    }
    return (
        <div className="booking-card-container">
            <div className="booking-card-content">
                <div className="booker-avatar">
                    <img src={renderImage()} width="70" height="70"/>
                </div>
                <div className="booker-details">
                    <div className="booker-seatNo">Seat no: {data.seatNo}</div>
                    <div className="booker-name">Name: {data.name}</div>
                    <div className="booker-phone">Phone no: {data.phoneNo}</div>
                    <button className="booking-cancel-btn" onClick={() => onPress(uid)}>Cancel booking</button>
                </div>
            </div>
        </div>
    )
}

export default BookingCard
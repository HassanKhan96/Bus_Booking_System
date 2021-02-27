import React, { useState, useEffect } from 'react'
import AddInput from './AddInput'
import './css/RideDetails.css'
import {Link} from 'react-router-dom'
import Firebase from 'firebase'
import Header from './Header'
import NotifyDialog from './NotifyDialog'
import LoadingDialog from './LoadingDialog'


const RideDetails = ({history}) => {
    const [From, setFrom] = useState("")
    const [To, setTo] = useState("")
    const [picktime, setPicktime] = useState("")
    const [dropTime, setDropTime] = useState("")
    const [date, setDate] = useState("")
    const [mobile, setMobile] = useState("")
    const [seatsRemaining, setSeats] = useState("")
    const [Fare, setFare] = useState("")
    const [busNo, setBusNo] = useState("")
    const [totalSeats, setTotalSeats] = useState("")
    const [Notify,setNotify] = useState(false)
    const [Loading, setLoading] = useState(false)
    
    const onAdd = () => {
        setLoading(true)
        const rideRef = Firebase.database().ref('/rides').push()
        rideRef.set({
            startLocation: From,
            dropLocation: To,
            pickUptime: picktime,
            dropTime,
            date,
            MBnumber: mobile,
            seatsRemaining,
            fare: Fare,
            busNo,
            totalSeats,
        })
        .then(() => {
            setLoading(false)
            console.log("data added") 
            setNotify(true)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
    return (
        <div className="detail-container">
            <LoadingDialog isLoading={Loading}/>
            <NotifyDialog isNotify={Notify} text="New ride has been added." onAgree={() => {
                setNotify(false)
                history.push('/rides')
            }}/>
            <Header />
            <div className="detail-content">
            <div className="detail-title">
                <div className="detail-title-text"><h1>Add Ride</h1></div>
            </div>
                <AddInput label="Bus no" Value={busNo} onValueChange={text => setBusNo(text)}/>
                <AddInput label="Total Seats" Value={totalSeats} onValueChange={text => setTotalSeats(text)}/>
                <AddInput label="From" Value={From} onValueChange={text => setFrom(text)}/>
                <AddInput label="To" Value={To} onValueChange={text => setTo(text)}/>
                <AddInput label="Pick Up time" Value={picktime} onValueChange={text => setPicktime(text)}/>
                <AddInput label="Drop time" Value={dropTime} onValueChange={text => setDropTime(text)}/>
                <AddInput label="Date" Value={date} onValueChange={text => setDate(text)}/>
                <AddInput label="Mobile no" Value={mobile} onValueChange={text => setMobile(text)}/>
                <AddInput label="Seats Remaining" Value={seatsRemaining} onValueChange={text => setSeats(text)}/>
                <AddInput label="Fare" Value={Fare} onValueChange={text => setFare(text)}/>
            </div>
            <div className="detail-bottom-padding" />
            <div className="detail-options">
                <button className="save-btn" onClick={() => {
                    onAdd()
                }}>Add</button>
                <div className="separator" />
                <button className="ride-delete-btn" onClick={() => {
                    history.goBack()
                }}>Cancel</button>
            </div>
        </div>
    )
}

export default RideDetails
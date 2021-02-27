import React, { useState, useEffect } from 'react'
import DetailInput from './DetailInput'
import './css/RideDetails.css'
import { Link, useHistory } from 'react-router-dom'
import Firebase from 'firebase'
import Header from './Header'
import DialogBox from './DialogBox'
import LoadingDialog from './LoadingDialog'
import NotifyDialog from './NotifyDialog'


const RideDetails = (props) => {
    const history = useHistory()
    const { Data } = props.location.state
    const [From, setFrom] = useState(Data.startLocation)
    const [To, setTo] = useState(Data.dropLocation)
    const [picktime, setPicktime] = useState(Data.pickUptime)
    const [dropTime, setDropTime] = useState(Data.dropTime)
    const [date, setDate] = useState(Data.date)
    const [mobile, setMobile] = useState(Data.MBnumber)
    const [seatsRemaining, setSeats] = useState(Data.seatsRemaining)
    const [Fare, setFare] = useState(Data.fare)
    const [busNo, setBusNo] = useState(Data.busNo)
    const [totalSeats, setTotalseats] = useState(Data.totalSeats)
    const [open, setOpen] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [Notify, setNotify] = useState(false)
    const [ChangeNotify, setChangeNotify] = useState(false)
    const [changeText, setchangeText] = useState("")
    const [bookersId, setBookersId] = useState([])
    const rideId = Data.key
    //console.log(Data)

    const ride = Firebase.database().ref(`/rides/${Data.key}`)
    const bookings = Firebase.database().ref(`/ridesbooked/${rideId}`)
    const users = Firebase.database().ref(`/users`)

    const onSave = () => {
        setLoading(true)
        ride.update({
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
        }).then(() => {
            bookings.once('value')
                .then(snapshot => {
                    snapshot.forEach(childshot => {
                        users.child(`${childshot.key}/mybookings/${rideId}`)
                            .update({
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
                            .catch(err => console.log(err))
                    })
                })
        })
            .then(() => {
                setLoading(false)
                setchangeText("Changes have been saved!")
                setChangeNotify(true)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const onUndoChanges = () => {
        setLoading(true)
        const {
            startLocation,
            dropLocation,
            pickUptime,
            dropTime,
            date,
            MBnumber,
            seatsRemaining,
            fare,
            busNo,
            totalSeats
        } = Data

        ride.update({
            startLocation,
            dropLocation,
            pickUptime,
            dropTime,
            date,
            MBnumber,
            seatsRemaining,
            fare,
            busNo,
            totalSeats,
        })
            .then(() => {
                setLoading(false)
                setchangeText("Changes have been undone!")
                setFrom(startLocation)
                setTo(dropLocation)
                setPicktime(pickUptime)
                setDropTime(dropTime)
                setDate(date)
                setMobile(MBnumber)
                setSeats(seatsRemaining)
                setFare(fare)
                setBusNo(busNo)
                setTotalseats(totalSeats)
                setChangeNotify(true)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const onDelete = () => {
        setOpen(false)
        setLoading(true)
        ride.remove()
            .then(() => {
                setLoading(false)
                bookings.once('value')
                    .then(snapshot => {
                        snapshot.forEach(childshot => {
                            users.child(`${childshot.key}/mybookings/${rideId}`)
                                .remove()
                        })
                    })
                    .then(() => {
                        bookings.remove()
                            .catch(err => err)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .then(() => {
                setNotify(true)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <div className="detail-container">
            <DialogBox
                title="Delete ride"
                text="Are you sure you want to delete this ride"
                isOpen={open}
                setOpen={() => setOpen(false)}
                onAgree={() => {
                    onDelete()
                }}
            />
            <LoadingDialog isLoading={Loading} />
            <NotifyDialog isNotify={Notify} text="Ride has been deleted!" onAgree={() => {
                setNotify(false)
                history.push('/rides')
            }} />
            <NotifyDialog isNotify={ChangeNotify} text={changeText} onAgree={() => {
                setChangeNotify(false)
            }} />
            <Header />
            <div className="detail-content">
                <div className="detail-title">
                    <div className="detail-title-text"><h1>Bus Details</h1></div>
                </div>
                <DetailInput label="Bus no" Value={busNo} isEditable={true} onValueChange={text => setBusNo(text)} />
                <DetailInput label="From" Value={From} isEditable={true} onValueChange={text => setFrom(text)} />
                <DetailInput label="To" Value={To} isEditable={true} onValueChange={text => setTo(text)} />
                <DetailInput label="Total Seats" Value={totalSeats} isEditable={true} onValueChange={text => setTotalseats(text)} />
                <DetailInput label="Seats Remaining" Value={seatsRemaining} isEditable={true} onValueChange={text => setSeats(text)} />
                <DetailInput label="Pick Up time" Value={picktime} isEditable={true} onValueChange={text => setPicktime(text)} />
                <DetailInput label="Drop time" Value={dropTime} isEditable={true} onValueChange={text => setDropTime(text)} />
                <DetailInput label="Date" Value={date} isEditable={true} onValueChange={text => setDate(text)} />
                <DetailInput label="Mobile no" Value={mobile} isEditable={true} onValueChange={text => setMobile(text)} />
                <DetailInput label="Fare" Value={Fare} isEditable={true} onValueChange={text => setFare(text)} />
            </div>
            <div className="detail-bottom-padding" />
            <div className="detail-options">
                <button className="save-btn" onClick={() => onSave()}>Save</button>
                <div className="separator" />
                <button className="undo-btn" onClick={() => onUndoChanges()}>Undo Changes</button>
                <div className="separator" />
                <button className="ride-delete-btn" onClick={() => setOpen(true)}>Delete Ride</button>
            </div>
        </div>
    )
}

export default RideDetails
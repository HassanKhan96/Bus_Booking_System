import React, { useState, useEffect, Component } from 'react'
import "./css/Bookings.css"
import Header from './Header'
import Firebase from 'firebase'
import BookingCard from './BookingCard'
import LoaderComponent from './LoaderComponent'
import DialogBox from './DialogBox'
import LoadingDialog from './LoadingDialog'
import NotifyDialog from './NotifyDialog'

const Bookings = (props) => {
    const rideId = props.location.state.Data.key
    const { Data } = props.location.state
    const rideBooked = Firebase.database().ref(`ridesbooked/${rideId}/`)
    const bookersRef = Firebase.database().ref(`/users`)
    const [Bookers, setBookers] = useState([])
    const [open, setOpen] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [rerender, setrender] = useState(false)
    const [Notify, setNotify] = useState(false)
    const [userId, setuserId] = useState("")
    const getData = async () => {
        let keys = []
        let handles = []
        let data = []
        let changeData = []
        await rideBooked.on('child_added', snapshot => {
            let userRef = bookersRef.child(snapshot.key)
            userRef.on('value', userSnap => {
                if(!data.some(item => item.uid === userSnap.key)){
                    data.push({...userSnap.val(), seatNo: snapshot.val().seatNo, uid: userSnap.key})
                    	//console.log(data)
                        Bookers.push(data)
                        setBookers([...data])
        
                   
                }
                
            }) 
                
        })
	rideBooked.on('child_removed', snapshot => {
		let userRef = bookersRef.child(snapshot.key)
		userRef.once('value').then(userSnap => {
			let dat = Bookers.filter(item => !item.includes({...userSnap.val(), seatNo: snapshot.val().seatNo, uid: userSnap.key}))
			console.log(dat)

		
		})	
	})
        
    }

  
    const onCancel = (userId) => {
        setuserId(userId)
        setOpen(true)
    }

    const onAction = () => {
        setOpen(false)
        setLoading(true)
        rideBooked.child(userId)
        .remove()
        .then(() => {
            bookersRef.child(`${userId}/mybookings/${rideId}`)
            .remove()
            .then(() => {
                Firebase.database().ref(`rides/${rideId}`)
                .update({
                    seatsRemaining: parseInt(Data.seatsRemaining)+1
                })
            })
            .catch(e => {
                setLoading(false)
                console.log(e)
            })
        })
        .then(() => {
            setOpen(false)
            setLoading(false)
            setNotify(true)
        })
        .catch(err => {
            setOpen(false)
            console.log(err)
            setLoading(false)
        })
    }


    const renderData = () => {
        getData()
        .then(() => {
            setrender(!rerender)
        })
    }
    
    useEffect(() => {
        renderData()         
    }, [])
    return (
        <div className="bookings-container">
            <DialogBox
                title="Cancel booking"
                text="Are you sure you want to cancel this booking"
                isOpen={open}
                setOpen={() => setOpen(false)}
                onAgree={() => {
                    onAction()
                }}
            />
            <LoadingDialog isLoading={Loading} />
            <NotifyDialog isNotify={Notify} text="Bookings has been Canceled!" onAgree={() => {
                setNotify(false)
            }} />
            <Header />
            <div className="bookings-content">
                <h2>Bookings</h2>
                <div className="bookings-main">
                    {
                        Bookers.length > 0
                            ? <ul>
                                {
                                    Bookers.map((item,index) => {
                                        return <li key={index}><BookingCard data={item} onPress={(uid) => onCancel(uid)}/></li>
                                    })
                                }
                            </ul>
                            : <LoaderComponent size={50} />
                    }
                    <div className="bookings-details">
                        <h3>Ride details</h3>
                        <div className="bookings-busNo">Bus no: {Data.busNo}</div>
                        <div className="bookings-pickplace">Pick up Location: {Data.startLocation}</div>
                        <div className="bookings-dropplace">Drop location: {Data.dropLocation}</div>
                        <div className="bookings-picktime">Pickup time: {Data.pickUptime}</div>
                        <div className="bookings-droptime">Drop time: {Data.dropTime}</div>
                        <div className="booking-totalseats">Total seats: {Data.totalSeats}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookings
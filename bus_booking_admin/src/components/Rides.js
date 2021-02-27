import React, { useState, useEffect } from 'react'
import Firebase from 'firebase'
import './css/Rides.css'
import RideCard from '../components/RideCard'
import { Link, Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import LoaderComponent from './LoaderComponent'
import Header from './Header'
const Rides = ({history}) => {
    const [DATA, setDATA] = useState([])
    const [Loading, setLoading] = useState(null)
    Firebase.auth().onAuthStateChanged(user => {
        if(user==null){
            history.push("/Login")
        }
    })
    useEffect(() => {
        let data = []
        const ridesRef = Firebase.database().ref('/rides')
        setLoading(true)
        ridesRef.on('value', snapshot => {
            snapshot.forEach(childshot => {
                data.push({...childshot.val(), key: childshot.key})
            })
            setDATA(data)
            //console.log(data)
            setLoading(false)
        })

        ridesRef.on("child_changed", snapshot => {
            data = []
        })

    }, [])
    return (
        <div className="content-rides">
            <Header />
            <div className="main-rides">
                {
                    Loading===true ?
                        <LoaderComponent size={70} text="Loading Rides"/>
                        : <div className="list-container">
                            <ul>
                                {
                                    DATA.length != 0
                                        ? DATA.map((item) => {
                                            return <li key={item.key}><RideCard data={item} /></li>
                                        })
                                        :<li>
                                            <div className="rides-nodata">
                                                <h3>Oops no rides were found!</h3>
                                            </div>
                                        </li>
                                }
                            </ul>
                        </div>
                }
                <div className="add-ride">
                    <Link to="/AddRide" className="add-link"><div className="add-ride-section">+</div></Link>
                </div>
            </div>
        </div>
    )
}

export default Rides
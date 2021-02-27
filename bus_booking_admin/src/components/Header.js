import React from 'react'
import './css/Rides.css'
import { Link, useHistory } from 'react-router-dom'
import Firebase from 'firebase'

const Header = () => {
    const history = useHistory()
    return (
        <div className="header-rides">
            <div className='logo-rides'>
                <img
                    src={require("../images/logo.png")}
                    alt="Logo"
                />
                <h2 className="admin-title">ADMIN PANEL</h2>
            </div>
            <div className="navbar-rides">
                <ul>
                    <Link to="/Rides" className="nav-link"><li>Rides</li></Link>
                    <Link to="/About" className="nav-link"><li>About</li></Link>
                        <button className="logout-section" onClick={() => {
                            Firebase.auth().signOut()
                            .then(() => {
                                history.push("/Login")
                            })
                            .catch(err => console.log(err))
                        }}>
                            <img src={require("../images/logout.png")} className="logout-logo" alt="logo" />
                            <div className="logout-text">Logout</div>
                        </button>
                </ul>
            </div>
        </div>
    )
}

export default Header
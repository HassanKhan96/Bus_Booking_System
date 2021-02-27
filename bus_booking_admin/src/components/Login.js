import React, { useState, useEffect } from 'react'
import './css/Login.css'
import Firebase from 'firebase'
import { useHistory, Redirect } from 'react-router-dom'
import LoaderComponent from './LoaderComponent'

const Login = () => {
    
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
                history.push('/rides')
            }
            else {
                setLoading(false)
            }
        })
    }, [])

    
    
    const [username, setusername] = useState('')
    const [password, setPass] = useState('')

    const onSubmitForm = (e) => {
        e.preventDefault()
        Firebase.auth().signInWithEmailAndPassword(username, password)
            .then(() => {
                history.push('/rides')
            })
            .catch(er => console.log(er))
    }
    return (
        <>
            {
                loading==false?
                <div className='container'>
                    <div className='logo'>
                        <img
                            src={require("../images/logo.png")}
                            alt="Logo"
                        />
                        <h1>eBUS</h1>
                    </div>
                    <div className="wrapper">
                        <div className='content'>
                            <h2 className="admin-title">ADMIN PANEL</h2>
                            <form className='form' onSubmit={onSubmitForm}>

                                <input
                                    type='text'
                                    placeholder="Username"
                                    className='inputbox'
                                    value={username}
                                    onChange={e => { setusername(e.target.value) }}
                                />

                                <input
                                    type='password'
                                    placeholder="Password"
                                    className='inputbox'
                                    value={password}
                                    onChange={e => { setPass(e.target.value) }}
                                />

                                <button className="submit" onClick={onSubmitForm}>
                                    Login
                    </button>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <div className="loader-container">
                <LoaderComponent text="Please Wait" size={50} />
                </div>
            }
        </>
    )
}



export default Login
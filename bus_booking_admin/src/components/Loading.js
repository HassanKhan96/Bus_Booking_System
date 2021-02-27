import React, {useEffect} from 'react'
import Firebase from 'firebase'
import LoaderComponent from './LoaderComponent'
import './css/Loading.css'

const Loading = ({history}) => {
    useEffect(()=>{
        Firebase.auth().onAuthStateChanged(user => {
            if(user){
                history.push("/rides")
            }
            else {
                history.push("/Login")
            }
        })
    },[])
    return (
        <div className="loading-container">
            <LoaderComponent text="Please Wait" size={50}/>
        </div>
    )
}

export default Loading
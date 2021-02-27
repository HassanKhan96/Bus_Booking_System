import React from 'react'
import firebase from 'firebase'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Rides from './components/Rides'
import RideDetails from './components/RideDetails'
import Users from './components/Users'
import About from './components/About'
import AddRide from './components/AddRide'
import Loading from './components/Loading'
import NotFound from './components/NotFound'
import Bookings from './components/Bookings'

const App = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCOWfPhSkRsdhPL_MgOuqkJal-tcvjDiTE",
        authDomain: "bus-booking-appp.firebaseapp.com",
        databaseURL: "https://bus-booking-appp.firebaseio.com",
        projectId: "bus-booking-appp",
        storageBucket: "bus-booking-appp.appspot.com",
        messagingSenderId: "326894553693",
        appId: "1:326894553693:web:7b1b6eb86d0096a9881bb4"
      };
      if(!firebase.apps.length){
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }
    return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Loading} />
                <Route path='/Login' exact component={Login}/>
                <Route path='/rides' exact component={Rides}/>
                <Route path="/RideDetails" exact component={RideDetails}/>
                <Route path="/Users" exact component={Users} />
                <Route path="/About" exact component={About} />
                <Route path="/AddRide" exact component={AddRide}/>
                <Route path="/Bookings" exact component={Bookings} />
                <Route component={NotFound} />
            </Switch>
           
        </BrowserRouter>
    </div>
    )
}

export default App
import React from 'react'
import Header from './Header'
import "./css/About.css"
const About = () => {


    return (
        <div className="About-container">
            <Header />
            <div className="About-content">
                <div className="About-title">
                    <h2>About us</h2>
                </div>
                <div className="About-desc">
                    <p>We are undergrade students. We have the skills of networking, programming, React native, React, nodejs, Firebase and basic networking. If you want to contact us about any query related to this app or you are interested in appointing us for some project feel free to contact us.</p>
                </div>
                <div className="About-contact">
                    <div className="contact-card">
                        <img src={require('../images/hassan.jpg')} alt="image" width="150px" height="160px"/>
                        <div className="About-detail">
                            <div className="About-name">Name: Muhammad Hassan Zakiullah</div>
                            <div className="About-email">Email: khanhassan057@gmail.com</div>
                            <div className="About-phone">Mobile: 03128404679</div>
                        </div>
                    </div>
                    <div className="contact-card">
                    <img src={require('../images/fahad.jpg')} alt="image" width="150px" height="160px"/>
                        <div className="About-detail">
                            <div className="About-name">Name: Fahad Shiekh</div>
                            <div className="About-email">Email: fahadshaikhnaeem@gmail.com</div>
                            <div className="About-phone">Mobile: 03101224061</div>
                        </div>
                    </div>
                    <div className="contact-card">
                    <img src={require('../images/Faizan.jpg')} alt="image" width="150px" height="160px"/>
                        <div className="About-detail">
                            <div className="About-name">Name: Muhammad Faizan</div>
                            <div className="About-email">Email: FaizanRaza23@gmail.com</div>
                            <div className="About-phone">Mobile: 03214558765</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
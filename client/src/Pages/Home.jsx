import React from 'react';
import TopNavbar from '../Components/TopNavbar';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import CustomerBadges from '../Components/CustomerBadges';
import EmailLocation from '../Components/EmailLocation';
import ProcessBanner from '../Components/ProcessBanner';
import Steps from '../Components/Steps';

const Home = () => {
    return (
        <div>
            <TopNavbar/>
            <Navbar/>
            <Hero/>
            <EmailLocation/>
            <CustomerBadges/>
            <ProcessBanner/>
            <Steps/>
        </div>
    );
};

export default Home;
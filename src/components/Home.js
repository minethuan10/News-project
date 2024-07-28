import React from 'react';
import NavBar from './navbar'; // Adjust the path if necessary
import { Helmet } from 'react-helmet';

const Home = ({ darkMode }) => {
    return (
        <div className={`home ${darkMode ? 'dark-mode' : ''}`}>
            <Helmet>
                <title>NewsForYou - Home</title> {/* Set the page title */}
            </Helmet>
            <NavBar darkMode={darkMode} /> {/* Include the NavBar here */}
            <div className="description">
                <h2>About NewsForYou</h2>
                <p>
                    Welcome to NewsForYou, your go-to source for the latest news and updates. 
                    Our platform provides you with personalized news articles tailored to your interests. 
                    Join us today to stay informed and connected!
                </p>
            </div>
        </div>
    );
};

export default Home;
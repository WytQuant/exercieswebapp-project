import React from 'react';
import './Profile.css'

function Profile() {
    return (
        <div className="hr__profile">
            <img src="./img/userProfile.jpg" alt="user profile"/>
            <h2>Wittawas</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            {/* <h3>Recommend</h3>  */}
        </div>
    );
}

export default Profile;
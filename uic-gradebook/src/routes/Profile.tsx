import React from 'react';
import { Button , Image } from '@nextui-org/react';
import { flexCenter } from '../styles/styles';
// import { Button } from "@nextui-org/button";


const ProfilePage = () => {
  const profileData = {
    name: 'John Cena',
    gpa: 3.69,
    profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg',
  };

  // handle Delete acc
  const handleDeleteAccount = () => {
    // for future use
    alert('Account deleted.');
  };

  // handle change password
  const handleChangePassword = () => {
    // for future use
    alert('Password changed.');
  };

  const containerStyle = {
    display: 'flex',
    // alignitems: 'flex-start',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: '100px',
    height: '100vw',  // to center vertically within the viewport
    width: '100vw',  // to cover the entire width of the page
    backgroundColor: 'white',
    margin: '0 auto'
  };
  
  const buttonStyle = {
    width: '200px', //width for the buttons
    backgroundColor: '#F8F8FF',
    color: 'black',
    alignitems: 'center',
  };

  return (
    <div style={containerStyle}>
      <div className="profile-container">
        <div className="profile-info">
          <div style={{ display: 'flex', justifyContent: 'center-top',}}>
            <div style={{ marginRight: '20px' }}>
              <Image src={profileData.profilePicture} width={150} height={150} alt="Profile Picture" />
            </div>
            <div style={{ color: 'black', textAlign: 'center'}}>
              <h1>{profileData.name}</h1>
              <div style={{ color: 'black',textAlign: 'center', marginTop: '-30px', fontSize: '20px'}}>
                <p>GPA: {profileData.gpa}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '200px',display: 'flex',  justifyContent: 'center', paddingLeft: '100px'}}>
          <div className="profile-button">
          <div style={{ marginBottom: '10px', width: '100px',}}>
            <Button 
              style={buttonStyle}
              onClick={handleDeleteAccount}>Delete Account 
            </Button>
          </div>
          <div style={{ marginBottom: '10px', width: 'auto' }}>
            <Button 
              style={buttonStyle}
              onClick={handleChangePassword}>Change Password
            </Button>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
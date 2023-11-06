// // the gradebook logo goes in here and then for those sitatuions also the back button

// function Header() {
//     return (<>
//         <h1>Header</h1>
//     </>)
// }

// export default Header;

// import React from 'react';

// const TopHeader: React.FC = () => {
//   const goBack = () => {
//     window.history.back(); // Go back in the browser's history
//   };

//   return (
//     <div className="header">
//       <button className="back-button" onClick={goBack}>Back</button>
//     </div>
//   );
// };

// export default TopHeader;

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import myImage from '../Logo/logo.png';

const TopHeader: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#9E2D32',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    height: '100px',
    top: 0,
    zIndex: 100,
  };

  const imageStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    width: 'auto',
    margin: '0 auto',
  };

  const buttonStyle = {
    backgroundColor: '#9E2D32',
    color: 'white',
    fontSize: '30px',
  };

  return (
    <div className="header" style={headerStyle}>
      <div>
        <button
          className="back-button"
          style={buttonStyle}
          onClick={() => window.history.back()}
        >
          {'<'}
        </button>
      </div>

      <div style={imageStyle}>
        <Link to="/" className="logo-button">
          <img src={myImage} alt="Logo" />
        </Link>
      </div>
    </div>
  );
};

export default TopHeader;
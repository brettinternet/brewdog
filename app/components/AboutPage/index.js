import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <main className="about-page">
      <div className="content">
        <p>
          This is a coding exercise: <a href="https://github.com/brettinternet/brew-search">Brew-Search</a>.
        </p>
        <p>
          <Link to="/badlink">Click this bad link</Link> to see the 404 page.
        </p>
      </div>
    </main>
  );
};

export default AboutPage;



// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
//
// export default class AboutPage extends Component { // eslint-disable-line react/prefer-stateless-function
//
//   shouldComponentUpdate() {
//     return false;
//   }
//
//   render() {
//     return (
//       <div>
//         <h2 className="page-header">About</h2>
//         <p>
//           This is a coding exercise: <a href="https://github.com/brettinternet/brew-search">Brew-Search</a>.
//         </p>
//         <p>
//           <Link to="/badlink">Click this bad link</Link> to see the 404 page.
//         </p>
//       </div>
//     );
//   }
// };

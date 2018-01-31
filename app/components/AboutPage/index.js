import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AboutPage extends Component { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log(this.props);

    return (
      <main className="about-page">
        <section>
          <p>
            This is a coding exercise: <i className="fa fa-github"></i><a href="https://github.com/brettinternet/brew-search">brettinternet</a> / <a href="https://github.com/brettinternet/brew-search">BrewDog</a>.
          </p>
          <p>
            <Link to="/badlink">Click this bad link</Link> to see the 404 page.
          </p>
        </section>
      </main>
    );
  }
};

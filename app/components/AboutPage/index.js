import React, { Component } from 'react';

export default class AboutPage extends Component { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <main className="about-page">
        <section>
          <p>
            This is a coding exercise: <i className="fa fa-github"></i><a href="https://github.com/brettinternet">brettinternet</a> / <a href="https://github.com/brettinternet/brewdog">brewdog</a>.
          </p>
        </section>
      </main>
    );
  }
};

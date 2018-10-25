import React, { Component } from 'react';

class Navbar extends Component {
  getBike = event => {
    event.preventDefault()
    this.props.getCurrentPosition()
    console.log(event)
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="col-2">
          <a className="navbar-brand" href="index.html"><h1>EasyBike</h1></a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div id="navbarNavAltMarkup" className="col-md-8 collapse navbar-collapse">
          <div className="navbar-nav text-right text-md-center mx-auto">
            <button className="nav-item nav-link" onClick={this.getBike} onTouchStart={this.getBike}>Prendre un vélo</button>
            <a className="nav-item nav-link" href="#">Déposer un vélo</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

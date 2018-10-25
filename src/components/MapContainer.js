import React, { Component } from 'react';
import MapLeaflet from './MapLeaflet';
import { get } from 'https';

class MapContainer extends Component {
  render() {
    const { stationsToDisplay, displayFeature, getUserPosition, geolocationError, getCurrentPosition, userPosition, isUserLocated } = this.props;
    return (
      <div id="mapContainer" className="container-fluid col-12 col-md-9">
        <MapLeaflet
          stationsToDisplay={stationsToDisplay}
          displayFeature={displayFeature}
          getUserPosition={getUserPosition}
          geolocationError={geolocationError}
          getCurrentPosition={getCurrentPosition}
          userPosition={userPosition}
          isUserLocated={isUserLocated}
        />
      </div>
    );
  }
}
export default MapContainer;

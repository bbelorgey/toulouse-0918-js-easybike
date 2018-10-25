import React, { Component } from 'react';
import MapLeaflet from './MapLeaflet';

class MapContainer extends Component {
  render() {
    const {
      stationsToDisplay,
      displayFeature,
      minStandsToDisplay,
      minBikesToDisplay,
      selectedOption,
      favStationsId,
      updateStationsList,
      handleFavList,
      getUserPosition,
      geolocationError,
      getCurrentPosition,
      userPosition,
      isUserLocated,
      readStoredFav,
      clearError,
      detectError
    } = this.props;

    return (
      <div id="mapContainer" className="container-fluid col-12 col-md-9">
        <MapLeaflet
          stationsToDisplay={stationsToDisplay}
          displayFeature={displayFeature}
          minStandsToDisplay={minStandsToDisplay}
          minBikesToDisplay={minBikesToDisplay}
          selectedOption={selectedOption}
          favStationsId={favStationsId}
          updateStationsList={updateStationsList}
          handleFavList={handleFavList}
          getUserPosition={getUserPosition}
          geolocationError={geolocationError}
          getCurrentPosition={getCurrentPosition}
          userPosition={userPosition}
          isUserLocated={isUserLocated}
          readStoredFav={readStoredFav}
          clearError={clearError}
          detectError={detectError}
        />
      </div>
    );
  }
}
export default MapContainer;

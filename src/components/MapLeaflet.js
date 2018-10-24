import React, { Component } from 'react';
import axios from 'axios';

import {
  Map, TileLayer, Marker, Popup, type Viewport
} from 'react-leaflet';

import Geolocation from 'react-geolocation';
import { apiKey } from './settings';

import MapControls from './MapControls';
import MarkersLayer from './MarkersLayer';

const defaultCenter = {
  center: [43.599761799999996, 1.443197],
  zoom: 15
};

class MapLeaflet extends Component<
  {},
  { viewport: Viewport },
  > {
  state = {
    viewport: defaultCenter,
  }

  constructor(props) {
    super(props);
    this.state = {
      viewCenter: defaultCenter.center,
      zoom: defaultCenter.zoom,
      stationsList: [],
      isLoading: false,
      error: null,
      panelToDisplay: ''
    };
  }

  componentDidMount() {
    this.refreshStationsList();
    this.interval = setInterval(this.refreshStationsList, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  centerOnUser = (userPosition) => {
    console.log(`on centre sur ${userPosition}`);
    this.setState({
      viewport: {
        center: userPosition,
        zoom: 15
      }
    })
  }

  clearError = () => {
    this.setState({ error: null });
  }

  refreshStationsList = () => {
    const { favStationsId,updateStationsList } = this.props;
    console.log('refresh');
    this.setState({ error: null });
    const request = `https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=${apiKey}`;
    this.setState({ isLoading: true });

    axios.get(request)
      .then(result => {
        const stationsList = result.data.map(
          station => {
            const isFavorite = favStationsId.includes(station.number);
            return { ...station,isFavorite:isFavorite}
          }
        );
        this.setState({
          stationsList: stationsList ,
          isLoading: false
        })

        updateStationsList(stationsList);
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    const { stationsToDisplay, displayFeature } = this.props;
    const { viewCenter, zoom, stationsList, viewport } = this.state;

    return (
      <div className="map">
        <Geolocation
          lazy
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) => {
            let isUserLocated = false;
            if (!latitude || !longitude) {
              isUserLocated = false;
            } else {
              isUserLocated = true;
            }

            console.log(`is fetching : ${fetchingPosition}, is user located : ${isUserLocated} `);
            console.log(`latitude = ${latitude} and longitude = ${longitude}`);
            const userMarker = isUserLocated
              ? (
                <Marker position={[latitude, longitude]}>
                  <Popup>
                    <span>Votre position</span>
                  </Popup>
                </Marker>
              )
              : null;

            const userPosition = isUserLocated ? [latitude, longitude] : viewCenter;

            return (
              <Map
                className="map__reactleaflet"
                center={userPosition}
                zoom={zoom}
                onClick={displayFeature}
                viewport={viewport}
              >
                <TileLayer
                  url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
                />
                <MarkersLayer
                  stationsToDisplay={stationsToDisplay}
                  stationsList={stationsList}
                  error={error}
                  refreshStationsList={this.refreshStationsList}
                />
                <MapControls
                  getCurrentPosition={getCurrentPosition}
                  centerOnUser={this.centerOnUser}
                  refreshStationsList={this.refreshStationsList}
                  displayFeature={displayFeature}
                />
                {userMarker}
              </Map>
            );
          }}
        />
      </div>
    );
  }
}

export default MapLeaflet;

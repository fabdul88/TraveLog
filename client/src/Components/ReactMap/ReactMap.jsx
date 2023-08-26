import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './api';
import MapPinRed from '../../assets/icons/map-pin-red1.svg';
import LogEntryForm from '../LogEntryForm/logEntryForm';
import LogEntry from '../LogEntry/LogEntry';
import './reactMap.scss';

const ReactMap = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 49.246292,
    longitude: -123.116226,
    zoom: 8,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    setAddEntryLocation({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  };

  const MAP = process.env.REACT_APP_MAPBOX_TOKEN;
  const MAP_STYLE = process.env.REACT_APP_MAP_STYLE;
  return (
    <div className="map">
      <ReactMapGL
        className="map__react-gl"
        {...viewport}
        // Setting map theme from mapbox
        mapStyle={MAP_STYLE}
        // mapbox Api Access Token
        mapboxApiAccessToken={MAP}
        onViewportChange={setViewport}
        onDblClick={showAddMarkerPopup}
      >
        <LogEntry
          logEntries={logEntries}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          viewport={viewport}
          location={addEntryLocation}
          onClose={() => {
            setAddEntryLocation(null);
            getEntries();
          }}
        />
        {addEntryLocation ? (
          <div>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <div>
                <img
                  className="map__pin-red"
                  style={{
                    width: `${4 * viewport.zoom}px`,
                    height: `${4 * viewport.zoom}px`,
                  }}
                  src={MapPinRed}
                  alt="Map Pin"
                />
              </div>
            </Marker>
            <Popup
              className="map__popup"
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              dynamicPosition={true}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
            >
              <div className="map__new-info-container">
                <LogEntryForm
                  onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                  location={addEntryLocation}
                />
              </div>
            </Popup>
          </div>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default ReactMap;

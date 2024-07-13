import * as React from 'react';
import {
  InfoWindow as GMInfoWindow,
  OverlayView as GMOverlayView,
  useGoogleMap,
} from '@react-google-maps/api';
import { mapMouseEventToMapEvent } from '../utils/mouse-event';
export const CalloutContext = React.createContext({
  coordinate: { latitude: 0, longitude: 0 },
  calloutVisible: false,
  toggleCalloutVisible: () => {},
  markerSize: { width: 0, height: 0 },
  anchor: { x: 0, y: 0 },
});
export function Callout(props) {
  const map = useGoogleMap();
  const {
    coordinate,
    calloutVisible,
    toggleCalloutVisible,
    markerSize,
    anchor,
  } = React.useContext(CalloutContext);
  //By default callout is positioned to bottom center
  //i.e. is at anchor: (0.5, 1)
  //This compensates to match expected result using the provided anchor prop
  const xOffset = -(markerSize.width * (0.5 - anchor.x));
  const yOffset = -(markerSize.height * (1 - anchor.y));
  return calloutVisible
    ? React.createElement(
        'div',
        {
          onClick: (e) => {
            props.onPress?.(
              mapMouseEventToMapEvent(null, coordinate, map, 'callout-press')
            );
            e.stopPropagation(); //Prevent marker click handler from being called
          },
        },
        props.tooltip
          ? React.createElement(
              GMOverlayView,
              {
                mapPaneName: 'overlayMouseTarget',
                position: {
                  lat: Number(coordinate.latitude),
                  lng: Number(coordinate.longitude),
                },
                getPixelPositionOffset: () => ({
                  x: xOffset,
                  y: yOffset,
                }),
              },
              React.createElement(
                'div',
                { style: { transform: 'translate(-50%,-100%)' } },
                props.children
              )
            )
          : React.createElement(
              GMInfoWindow,
              {
                position: {
                  lat: Number(coordinate.latitude),
                  lng: Number(coordinate.longitude),
                },
                options: {
                  pixelOffset: new google.maps.Size(xOffset, yOffset),
                },
                onCloseClick: () => toggleCalloutVisible(),
              },
              React.createElement(React.Fragment, null, props.children)
            )
      )
    : null;
}

import React from 'react';
import {
  Marker as GMMarker,
  OverlayViewF as GMOverlayView,
  useGoogleMap,
} from '@react-google-maps/api';
import { mapMouseEventToMapEvent } from '../utils/mouse-event';
import { Callout, CalloutContext } from './callout';
//Wrapped in class component to provide methods
//forwardRef + useImperativeHandle not sufficient because it returns a ForwardRefExoticComponent which does not seem to render in the MapView
export class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { calloutVisible: false };
  }
  showCallout() {
    this.setState({ calloutVisible: true });
  }
  hideCallout() {
    this.setState({ calloutVisible: false });
  }
  render() {
    return React.createElement(MarkerF, {
      ...this.props,
      calloutVisible: this.state.calloutVisible,
      toggleCalloutVisible: () =>
        this.setState({ calloutVisible: !this.state.calloutVisible }),
    });
  }
}
function MarkerF(props) {
  const map = useGoogleMap();
  const customMarkerContainerRef = React.useRef();
  const [markerSize, setMarkerSize] = React.useState({ width: 22, height: 40 }); //22 x 40 is the default google maps marker size
  React.useEffect(() => {
    if (customMarkerContainerRef.current) {
      setMarkerSize({
        width: customMarkerContainerRef.current.clientWidth,
        height: customMarkerContainerRef.current.clientHeight,
      });
    }
  }, [customMarkerContainerRef.current]);
  const onMarkerPress = (e) => {
    props.onPress?.(
      mapMouseEventToMapEvent(e, props.coordinate, map, 'marker-press')
    );
    props.toggleCalloutVisible();
  };
  const hasNonCalloutChildren = React.useMemo(
    () =>
      !!React.Children.toArray(props.children).find((child) => {
        return child.type !== Callout;
      }),
    [props.children]
  );
  //Default anchor values to react-native-maps values (https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md)
  const anchor = props.anchor || { x: 0.5, y: 1 };
  const calloutAnchor = props.calloutAnchor || { x: 0.5, y: 0 };
  const calloutContextValue = {
    calloutVisible: props.calloutVisible,
    toggleCalloutVisible: props.toggleCalloutVisible,
    coordinate: props.coordinate,
    markerSize,
    anchor: calloutAnchor,
  };
  return React.createElement(
    CalloutContext.Provider,
    { value: calloutContextValue },
    React.createElement(
      React.Fragment,
      null,
      hasNonCalloutChildren
        ? React.createElement(
            GMOverlayView,
            {
              mapPaneName: 'overlayMouseTarget',
              position: {
                lat: Number(props.coordinate.latitude),
                lng: Number(props.coordinate.longitude),
              },
              getPixelPositionOffset: (w, h) => ({
                x: -(w * anchor.x),
                y: -(h * anchor.y),
              }),
            },
            React.createElement(
              'div',
              { ref: customMarkerContainerRef, onClick: () => onMarkerPress() },
              props.children
            )
          )
        : React.createElement(GMMarker, {
            draggable: props.draggable,
            title: props.title,
            onClick: (e) => onMarkerPress(e),
            onDrag: (e) =>
              props.onDrag?.(
                mapMouseEventToMapEvent(e, props.coordinate, map, '')
              ),
            onDragStart: (e) =>
              props.onDragStart?.(
                mapMouseEventToMapEvent(e, props.coordinate, map, '')
              ),
            onDragEnd: (e) =>
              props.onDragEnd?.(
                mapMouseEventToMapEvent(e, props.coordinate, map, '')
              ),
            options: {
              clickable: props.tappable,
              opacity: props.opacity,
              draggable: props.draggable,
              anchorPoint: props.anchor
                ? new google.maps.Point(props.anchor?.x, props.anchor?.y)
                : null,
            },
            position: {
              lat: Number(props.coordinate.latitude),
              lng: Number(props.coordinate.longitude),
            },
            children: props.children,
          })
    )
  );
}

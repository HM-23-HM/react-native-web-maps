"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Callout = Callout;
exports.CalloutContext = void 0;
var React = _interopRequireWildcard(require("react"));
var _api = require("@react-google-maps/api");
var _mouseEvent = require("../utils/mouse-event");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CalloutContext = exports.CalloutContext = /*#__PURE__*/React.createContext({
  coordinate: {
    latitude: 0,
    longitude: 0
  },
  calloutVisible: false,
  toggleCalloutVisible: () => {},
  markerSize: {
    width: 0,
    height: 0
  },
  anchor: {
    x: 0,
    y: 0
  }
});
function Callout(props) {
  const map = (0, _api.useGoogleMap)();
  const {
    coordinate,
    calloutVisible,
    toggleCalloutVisible,
    markerSize,
    anchor
  } = React.useContext(CalloutContext);

  //By default callout is positioned to bottom center
  //i.e. is at anchor: (0.5, 1)
  //This compensates to match expected result using the provided anchor prop
  const xOffset = -(markerSize.width * (0.5 - anchor.x));
  const yOffset = -(markerSize.height * (1 - anchor.y));
  return calloutVisible ? /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      var _props$onPress;
      (_props$onPress = props.onPress) === null || _props$onPress === void 0 || _props$onPress.call(props, (0, _mouseEvent.mapMouseEventToMapEvent)(null, coordinate, map, 'callout-press'));
      e.stopPropagation(); //Prevent marker click handler from being called
    }
  }, props.tooltip ? /*#__PURE__*/React.createElement(_api.OverlayView, {
    mapPaneName: "overlayMouseTarget",
    position: {
      lat: Number(coordinate.latitude),
      lng: Number(coordinate.longitude)
    },
    getPixelPositionOffset: () => ({
      x: xOffset,
      y: yOffset
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: 'translate(-50%,-100%)'
    }
  }, props.children)) : /*#__PURE__*/React.createElement(_api.InfoWindow, {
    position: {
      lat: Number(coordinate.latitude),
      lng: Number(coordinate.longitude)
    },
    options: {
      pixelOffset: new google.maps.Size(xOffset, yOffset)
    },
    onCloseClick: () => toggleCalloutVisible()
  }, /*#__PURE__*/React.createElement(React.Fragment, null, props.children))) : null;
}
//# sourceMappingURL=callout.js.map
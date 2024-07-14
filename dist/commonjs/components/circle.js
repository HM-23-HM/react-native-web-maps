"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circle = Circle;
var _react = _interopRequireDefault(require("react"));
var _api = require("@react-google-maps/api");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Circle(props) {
  return /*#__PURE__*/_react.default.createElement(_api.Circle, {
    center: {
      lat: props.center.latitude,
      lng: props.center.longitude
    },
    radius: props.radius,
    options: {
      fillColor: props.fillColor,
      strokeColor: props.strokeColor,
      zIndex: props.zIndex
    }
  });
}
//# sourceMappingURL=circle.js.map
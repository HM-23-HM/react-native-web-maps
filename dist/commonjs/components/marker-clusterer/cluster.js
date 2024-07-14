"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cluster = Cluster;
exports.styles = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _marker = require("../marker");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Cluster(props) {
  return /*#__PURE__*/_react.default.createElement(_marker.Marker, {
    coordinate: props.coordinate,
    anchor: {
      x: 0.5,
      y: 0.5
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.text
  }, props.pointCountAbbreviated)));
}
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    backgroundColor: '#1380FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontWeight: '500'
  }
});
//# sourceMappingURL=cluster.js.map
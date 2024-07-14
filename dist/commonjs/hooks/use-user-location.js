"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUserLocation = useUserLocation;
var Location = _interopRequireWildcard(require("expo-location"));
var _react = require("react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function useUserLocation(options) {
  const [location, setLocation] = (0, _react.useState)();
  const [watchPositionSubscription, setWatchPositionSubscription] = (0, _react.useState)();
  const [permission] = Location.useForegroundPermissions({
    request: options.requestPermission,
    get: options.showUserLocation
  });
  const handleLocationChange = (0, _react.useCallback)(function (e) {
    var _options$onUserLocati;
    setLocation(e);
    (_options$onUserLocati = options.onUserLocationChange) === null || _options$onUserLocati === void 0 || _options$onUserLocati.call(options, {
      nativeEvent: {
        coordinate: {
          ...e.coords,
          timestamp: Date.now(),
          altitude: e.coords.altitude || 0,
          heading: e.coords.heading || 0,
          accuracy: e.coords.accuracy || Location.Accuracy.Balanced,
          isFromMockProvider: e.mocked || false,
          speed: e.coords.speed || 0
        }
      }
    });
  }, [options.onUserLocationChange]);
  (0, _react.useEffect)(() => {
    if (permission !== null && permission !== void 0 && permission.granted && options.followUserLocation) {
      Location.getCurrentPositionAsync().then(handleLocationChange);
      // Watch position
      Location.watchPositionAsync({
        accuracy: Location.Accuracy.Balanced
      }, handleLocationChange).then(setWatchPositionSubscription);
    }
    return () => watchPositionSubscription === null || watchPositionSubscription === void 0 ? void 0 : watchPositionSubscription.remove();
  }, [permission, options.followUserLocation]);
  return location;
}
//# sourceMappingURL=use-user-location.js.map
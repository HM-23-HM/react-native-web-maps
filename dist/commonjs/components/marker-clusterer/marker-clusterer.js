"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkerClusterer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _region = require("../../utils/region");
var _cluster = require("./cluster");
var _supercluster = _interopRequireDefault(require("supercluster"));
var _marker = require("../marker");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _MarkerClusterer(props) {
  const [supercluster, _setSupercluster] = (0, _react.useState)(new _supercluster.default());
  const markers = (0, _react.useMemo)(() => _react.default.Children.toArray(props.children).filter(child => {
    return child.type === _marker.Marker;
  }) || [], [props.children]);
  const points = (0, _react.useMemo)(() => markers.map(node => ({
    type: 'Feature',
    properties: {
      cluster: false,
      node
    },
    geometry: {
      type: 'Point',
      coordinates: [Number(node.props.coordinate.longitude), Number(node.props.coordinate.latitude)]
    }
  })), [markers]);
  const clusters = (0, _react.useMemo)(() => {
    if (!props.region) return [];
    const bbox = (0, _region.getBoundByRegion)(props.region);
    supercluster.load(points);
    return supercluster.getClusters(bbox, Math.round(Math.log(360 / props.region.longitudeDelta) / Math.LN2));
  }, [props.region, points]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, clusters.map((feature, idx) => {
    var _props$renderCluster;
    const clusterProperties = feature.properties;
    const clusterProps = {
      expansionZoom: supercluster.getClusterExpansionZoom(clusterProperties.cluster_id),
      pointCount: clusterProperties.point_count,
      pointCountAbbreviated: clusterProperties.point_count_abbreviated,
      coordinate: {
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1]
      }
    };
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: idx.toString()
    }, feature.properties.cluster === true ? ((_props$renderCluster = props.renderCluster) === null || _props$renderCluster === void 0 ? void 0 : _props$renderCluster.call(props, clusterProps)) || /*#__PURE__*/_react.default.createElement(_cluster.Cluster, {
      ...clusterProps
    }) : feature.properties.node);
  }));
}
const MarkerClusterer = exports.MarkerClusterer = /*#__PURE__*/(0, _react.memo)(_MarkerClusterer);
//# sourceMappingURL=marker-clusterer.js.map
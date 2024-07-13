import React, { memo, useMemo, useState } from 'react';
import { getBoundByRegion } from '../../utils/region';
import { Cluster } from './cluster';
import Supercluster from 'supercluster';
import { Marker } from '../marker';
function _MarkerClusterer(props) {
  const [supercluster, _setSupercluster] = useState(new Supercluster());
  const markers = useMemo(
    () =>
      React.Children.toArray(props.children).filter((child) => {
        return child.type === Marker;
      }) || [],
    [props.children]
  );
  const points = useMemo(
    () =>
      markers.map((node) => ({
        type: 'Feature',
        properties: { cluster: false, node },
        geometry: {
          type: 'Point',
          coordinates: [
            Number(node.props.coordinate.longitude),
            Number(node.props.coordinate.latitude),
          ],
        },
      })),
    [markers]
  );
  const clusters = useMemo(() => {
    if (!props.region) return [];
    const bbox = getBoundByRegion(props.region);
    supercluster.load(points);
    return supercluster.getClusters(
      bbox,
      Math.round(Math.log(360 / props.region.longitudeDelta) / Math.LN2)
    );
  }, [props.region, points]);
  return React.createElement(
    React.Fragment,
    null,
    clusters.map((feature, idx) => {
      const clusterProperties = feature.properties;
      const clusterProps = {
        expansionZoom: supercluster.getClusterExpansionZoom(
          clusterProperties.cluster_id
        ),
        pointCount: clusterProperties.point_count,
        pointCountAbbreviated: clusterProperties.point_count_abbreviated,
        coordinate: {
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
        },
      };
      return React.createElement(
        React.Fragment,
        { key: idx.toString() },
        feature.properties.cluster === true
          ? props.renderCluster?.(clusterProps) ||
              React.createElement(Cluster, { ...clusterProps })
          : feature.properties.node
      );
    })
  );
}
export const MarkerClusterer = memo(_MarkerClusterer);

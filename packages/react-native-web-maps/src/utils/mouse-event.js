export function mapMouseEventToMapEvent(e, defaultCoordinate, map, action) {
  return {
    preventDefault: e?.stop,
    stopPropagation: e?.stop,
    nativeEvent: {
      action,
      coordinate: {
        latitude: e?.latLng?.lat() || defaultCoordinate?.latitude || 0,
        longitude: e?.latLng?.lng() || defaultCoordinate?.longitude || 0,
      },
      position: map?.getProjection()?.fromLatLngToPoint({
        lat: e?.latLng?.lat() || Number(defaultCoordinate?.latitude) || 0,
        lng: e?.latLng?.lng() || Number(defaultCoordinate?.longitude) || 0,
      }) || { x: 0, y: 0 },
    },
  };
}

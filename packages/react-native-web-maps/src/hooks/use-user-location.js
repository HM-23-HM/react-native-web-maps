import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
export function useUserLocation(options) {
  const [location, setLocation] = useState();
  const [watchPositionSubscription, setWatchPositionSubscription] = useState();
  const [permission] = Location.useForegroundPermissions({
    request: options.requestPermission,
    get: options.showUserLocation,
  });
  const handleLocationChange = useCallback(
    function (e) {
      setLocation(e);
      options.onUserLocationChange?.({
        nativeEvent: {
          coordinate: {
            ...e.coords,
            timestamp: Date.now(),
            altitude: e.coords.altitude || 0,
            heading: e.coords.heading || 0,
            accuracy: e.coords.accuracy || Location.Accuracy.Balanced,
            isFromMockProvider: e.mocked || false,
            speed: e.coords.speed || 0,
          },
        },
      });
    },
    [options.onUserLocationChange]
  );
  useEffect(() => {
    if (permission?.granted && options.followUserLocation) {
      Location.getCurrentPositionAsync().then(handleLocationChange);
      // Watch position
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced },
        handleLocationChange
      ).then(setWatchPositionSubscription);
    }
    return () => watchPositionSubscription?.remove();
  }, [permission, options.followUserLocation]);
  return location;
}

export function transformRNCameraObject(camera) {
  return {
    tilt: camera.pitch,
    heading: camera.heading,
    zoom: camera.zoom,
    center: camera.center
      ? {
          lat: camera.center?.latitude,
          lng: camera.center?.longitude,
        }
      : undefined,
  };
}

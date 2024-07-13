import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Marker } from '../marker';
export function Cluster(props) {
  return React.createElement(
    Marker,
    { coordinate: props.coordinate, anchor: { x: 0.5, y: 0.5 } },
    React.createElement(
      View,
      { style: styles.container },
      React.createElement(
        Text,
        { style: styles.text },
        props.pointCountAbbreviated
      )
    )
  );
}
export const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    backgroundColor: '#1380FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
});

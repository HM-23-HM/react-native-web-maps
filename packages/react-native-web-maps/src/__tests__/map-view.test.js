import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { MapView } from '../components/map-view';
describe('<MapView /> props', () => {
  it('Returns null if provider is not `google`', () => {
    const { container } = render(
      React.createElement(MapView, {
        googleMapsApiKey: 'abc123',
        nonce: 'nonce',
      })
    );
    expect(container).toBeEmptyDOMElement();
  });
});

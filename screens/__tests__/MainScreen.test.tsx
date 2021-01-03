import React from 'react';
import renderer from 'react-test-renderer';

import MainScreen from '../MainScreen';

test('Correct Rendered', () => {
    const tree = renderer.create(<MainScreen />).toJSON();
    expect(tree).toMatchSnapshot()
});
import React from 'react';
import renderer from 'react-test-renderer';

import Manual from '../Manual';

test('Correct Rendered', () => {
    const tree = renderer.create(<Manual />).toJSON();
    expect(tree).toMatchSnapshot()
});
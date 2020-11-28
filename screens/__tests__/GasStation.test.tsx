import React from 'react';
import renderer from 'react-test-renderer';

import GasStation from '../GasStation';

test('Correct Rendered', () => {
    const tree = renderer.create(<GasStation />).toJSON();
    expect(tree).toMatchSnapshot()
});

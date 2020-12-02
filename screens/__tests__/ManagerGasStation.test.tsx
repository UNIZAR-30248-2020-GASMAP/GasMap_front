import React from 'react';
import renderer from 'react-test-renderer';

import ManagerGasStation from '../ManagerGasStation';

test('Correct Rendered', () => {
    const tree = renderer.create(<ManagerGasStation />).toJSON();
    expect(tree).toMatchSnapshot()
});

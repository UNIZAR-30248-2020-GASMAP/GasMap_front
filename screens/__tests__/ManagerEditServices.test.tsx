import React from 'react';
import renderer from 'react-test-renderer';

import ManagerEditServices from '../ManagerEditServices';

test('Correct Rendered', () => {
    const tree = renderer.create(<ManagerEditServices />).toJSON();
    expect(tree).toMatchSnapshot()
});

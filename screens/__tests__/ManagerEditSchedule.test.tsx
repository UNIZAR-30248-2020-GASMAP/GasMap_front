import React from 'react';
import renderer from 'react-test-renderer';

import ManagerEditSchedule from '../ManagerEditSchedule';

test('Correct Rendered', () => {
    const tree = renderer.create(<ManagerEditSchedule />).toJSON();
    expect(tree).toMatchSnapshot()
});

test('Replace schedule', () => {
    const mngSchedule = new ManagerEditSchedule(null)
    const newOpening = '07:00'
    const newClosing = '23:30'
    const oldSchedule = "Mon: 00:00-00:00\\nTue: 00:00-00:00\\nWed: 00:00-00:00\\nThu: 00:00-00:00\\nFri: 00:00-00:00\\nSat: 00:00-00:00\\nSun: 00:00-00:00\\n"
    const newSchedule = "Mon: " + newOpening + "-" + newClosing + "\\nTue: 00:00-00:00\\nWed: 00:00-00:00\\nThu: 00:00-00:00\\nFri: 00:00-00:00\\nSat: 00:00-00:00\\nSun: 00:00-00:00\\n"
    
    const givenSchedule = mngSchedule.replaceTime(oldSchedule, 'Mon', '07:00', '23:30')
    expect(givenSchedule).toEqual(newSchedule)
});
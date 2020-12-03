import React from 'react';
import renderer from 'react-test-renderer';

import ManagerGasStation, { FORMAT_BACK, FORMAT_EDIT } from '../ManagerGasStation';

test('Correct Rendered', () => {
    const tree = renderer.create(<ManagerGasStation />).toJSON();
    expect(tree).toMatchSnapshot()
});

test('prettySchedule BACK', () => {
    const mng = new ManagerGasStation(null)
    const schedule = "Mon: 08:00-23:00\\nTue: 07:00-23:00\\nWed: 08:00-23:00\\nThu: 09:00-23:00\\nFri: 10:00-23:00\\nSat: 06:00-00:00\\nSun: 06:00-00:00\\n"
    const prettyScheduleString = "Mon:	08:00	-	23:00\\nTue:	07:00	-	23:00\\nWed:	08:00	-	23:00\\nThu:	09:00	-	23:00\\nFri:  	10:00	-	23:00\\nSat: 	06:00	-	00:00\\nSun:	06:00	-	00:00\\n"
    
    expect(mng.prettySchedule(schedule,FORMAT_BACK)).toEqual(prettyScheduleString)
});

test('prettySchedule EDIT', () => {
    const mng = new ManagerGasStation(null)
    const schedule = "Mon: 08:00-23:00\\nTue: 07:00-23:00\\nWed: 08:00-23:00\\nThu: 09:00-23:00\\nFri: 10:00-23:00\\nSat: 06:00-00:00\\nSun: 06:00-00:00\\n"
    const prettyScheduleString = "Mon:	08:00	-	23:00\nTue:	07:00	-	23:00\nWed:	08:00	-	23:00\nThu:	09:00	-	23:00\nFri:  	10:00	-	23:00\nSat: 	06:00	-	00:00\nSun:	06:00	-	00:00\n"
    
    expect(mng.prettySchedule(schedule,FORMAT_EDIT)).toEqual(prettyScheduleString)
});

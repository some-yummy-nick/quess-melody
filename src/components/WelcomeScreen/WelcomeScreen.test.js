import React from 'react';
import renderer from 'react-test-renderer';
import {WelcomeScreen} from './WelcomeScreen.jsx';

it(`WelcomeScreen correctly renders after relaunch`, () => {
    const handleClick = jest.fn();
    const tree = renderer
        .create(<WelcomeScreen
            time={6}
            errorsCount={2}
            onWelcomeButtonClick={handleClick}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

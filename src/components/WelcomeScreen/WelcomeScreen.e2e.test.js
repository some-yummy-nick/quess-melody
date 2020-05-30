import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {WelcomeScreen} from '../WelcomeScreen/WelcomeScreen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`WelcomeScreen is correctly clicked`, () => {
    const handleWelcomeButtonClick = jest.fn();
    const welcomeScreen = shallow(<WelcomeScreen
        time={6}
        errorsCount={2}
        onWelcomeButtonClick={handleWelcomeButtonClick}
    />);
    const startButton = welcomeScreen.find(`button`);
    startButton.props().onClick();
    expect(handleWelcomeButtonClick.mock.calls.length).toBe(1);
});

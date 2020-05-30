import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ArtistQuestionScreen} from './ArtistQuestionScreen.jsx';
import {noop} from "../../utils";

Enzyme.configure({adapter: new Adapter()});

const question = {
    type: `artist`,
    answers: [{
        id: 1,
        picture: `picture`,
        artist: `John Snow`
    }],
    song: {
        id: 1,
        artist: `Some`,
        src: `src`
    }
};

const mockEvent = {
    preventDefault: noop,
};

it(`ArtistQuestionScreen is correctly changed`, () => {
    const onAnswer = jest.fn();
    const renderPlayer = jest.fn();
    const artistQuestionScreen = shallow(<ArtistQuestionScreen
        question={question}
        onAnswer={onAnswer}
        renderPlayer={renderPlayer}
    />);
    const answerInputs = artistQuestionScreen.find(`input`);
    const answerOne = answerInputs.at(0);
    answerOne.simulate(`change`, mockEvent);
    expect(onAnswer).toHaveBeenCalledTimes(1);

    // const startButton = artistQuestionScreen.find(`form.game__artist`);
    // startButton.props().onChange();
    // expect(handleChange .mock.calls.length).toBe(1);
});

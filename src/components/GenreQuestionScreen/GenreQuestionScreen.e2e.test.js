import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GenreQuestionScreen} from './GenreQuestionScreen.jsx';

Enzyme.configure({adapter: new Adapter()});

const question = {
    type: `genre`,
    answers: [{
        id: 1,
        src: `some-src`,
        genre: `pop`
    }],
    genre: `rock`
};

it(`GenreQuestionScreen is correctly submitted`, () => {
    const handleSubmit = jest.fn();
    const formSendPrevention = jest.fn();
    const renderPlayer = jest.fn();
    const genreQuestionScreen = shallow(<GenreQuestionScreen
        question={question}
        onAnswer={handleSubmit}
        renderPlayer={renderPlayer}
    />);

    const form = genreQuestionScreen.find(`form.game__tracks`);
    form.simulate(`submit`, {
        preventDefault: formSendPrevention,
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

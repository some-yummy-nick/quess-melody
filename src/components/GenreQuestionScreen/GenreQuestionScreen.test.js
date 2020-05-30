import React from 'react';
import renderer from 'react-test-renderer';
import {GenreQuestionScreen} from './GenreQuestionScreen.jsx';

const question = {
    type: `genre`,
    answers: [{
        id: 1,
        src: `some-src`,
        genre: `pop`
    }],
    genre: `rock`
};

it(`GenreQuestionScreen correctly renders after relaunch`, () => {
    const handleClick = jest.fn();
    const renderPlayer = jest.fn();

    const tree = renderer
        .create(<GenreQuestionScreen
            question={question}
            onAnswer={handleClick}
            renderPlayer={renderPlayer}
        />, {
            createNodeMock: () => {
                return {};
            }
        }).toJSON();
    expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import {ArtistQuestionScreen} from './ArtistQuestionScreen.jsx';

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

it(`ArtistQuestionScreen correctly renders after relaunch`, () => {
    const handleClick = jest.fn();
    const renderPlayer = jest.fn();
    const tree = renderer
        .create(<ArtistQuestionScreen
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

import React from 'react';
import renderer from 'react-test-renderer';
import {App} from '../App/App';

const questions = [{}];

it(`App correctly renders after relaunch`, () => {
    const onUserAnswer = jest.fn();
    const onWelcomeButtonClick = jest.fn();

    const tree = renderer
        .create(<App step={-1} questions={questions} maxMistakes={3} gameTime={2} onUserAnswer={onUserAnswer}
                     onWelcomeButtonClick={onWelcomeButtonClick}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

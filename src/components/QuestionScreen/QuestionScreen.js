import React from "react";
import PropTypes from "prop-types";

import Wrong from "../Wrong/Wrong";
import Timer from "../Timer/Timer";

export const QuestionScreen = ({genre, children}) =>
    <section className={`game game--${genre}`}>
        <header className="game__header">
            <a className="game__back" href="#">
                <span className="visually-hidden">Сыграть ещё раз</span>
                <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
            </a>
            <Timer/>
            <Wrong/>
        </header>
        <section className="game__screen">
            {children}
        </section>
    </section>;

QuestionScreen.propTypes = {
    genre: PropTypes.string,
    children: PropTypes.node
};

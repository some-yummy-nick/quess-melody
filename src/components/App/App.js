import React, {PureComponent} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {WelcomeScreen} from "../WelcomeScreen/WelcomeScreen.jsx";
import GenreQuestionScreen from "../GenreQuestionScreen/GenreQuestionScreen.jsx";
import ArtistQuestionScreen from "../ArtistQuestionScreen/ArtistQuestionScreen.jsx";
import {ActionCreator} from "../../actions";
import {GameType} from "../../constants";
import {randomInteger} from "../../utils";
import {QuestionScreen} from "../QuestionScreen/QuestionScreen";
import WithActivePlayer from "../../hocs/WithActivePlayer/WithActivePlayer";
import AuthorizationScreen from "../AuthorizationScreen/AuthorizationScreen";
import {NoMatch} from "../NoMatch/NoMatch";
import {Secret} from "../Secret/Secret";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";

const GenreQuestionScreenWrapped = WithActivePlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = WithActivePlayer(ArtistQuestionScreen);

class App extends PureComponent {

    renderGameScreen() {
        const {questions, onUserAnswer, onWelcomeButtonClick, step, gameTime, maxMistakes} = this.props;
        const question = questions[randomInteger(0, questions.length - 1)];
        if (step === -1 || step >= questions.length) {
            return <WelcomeScreen time={gameTime} maxMistakes={maxMistakes}
                                  onWelcomeButtonClick={onWelcomeButtonClick}/>;
        }
        if (question) {
            switch (question.type) {
                case GameType.ARTIST:

                    return <QuestionScreen type={question.type}>
                        <ArtistQuestionScreenWrapped question={question}
                                                     onAnswer={onUserAnswer}/>
                    </QuestionScreen>;
                case GameType.GENRE:
                    return <QuestionScreen type={question.type}>
                        <GenreQuestionScreenWrapped question={question}
                                                    onAnswer={onUserAnswer}/>
                    </QuestionScreen>;
                default:
                    break;
            }
        }
    }

    render() {
        const {authorizationStatus}= this.props;
        return <Router>
            <Switch>
                <Route path="/" exact render={() => this.renderGameScreen()}/>
                <Route path="/login" exact component={AuthorizationScreen}/>
                <PrivateRoute authorizationStatus={authorizationStatus} path="/secret" component={() => (<Secret/>)}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </Router>
    }
}

App.propTypes = {
    gameTime: PropTypes.number,
    step: PropTypes.number,
    mistakes: PropTypes.number,
    onWelcomeScreenClick: PropTypes.func,
    onUserAnswer: PropTypes.func,
    questions: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        genre: PropTypes.string,
        song: PropTypes.shape({
            artist: PropTypes.string,
            src: PropTypes.string,
        }),
        answers: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string,
            genre: PropTypes.string,
            picture: PropTypes.string,
            artist: PropTypes.string,
        }))
    })),
};

const mapStateToProps = state => ({
    step: state.step,
    questions: state.questions,
    maxMistakes: state.maxMistakes,
    gameTime: state.gameTime,
    authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
    onWelcomeButtonClick: () => dispatch(ActionCreator.incrementStep()),
    onUserAnswer: (question, userAnswer, mistakes, maxMistakes) => {
        dispatch(ActionCreator.incrementStep());
        dispatch(ActionCreator.incrementMistake(
            question, userAnswer, mistakes, maxMistakes
        ));
    }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

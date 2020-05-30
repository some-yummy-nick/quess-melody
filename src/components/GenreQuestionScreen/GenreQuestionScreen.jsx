import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../constants";
import {connect} from "react-redux";

class GenreQuestionScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userAnswer: new Array(props.question.answers.length).fill(false),
        };
    }

    render() {
        const {question, onAnswer, mistakes, maxMistakes, renderPlayer} = this.props;
        const {
            answers,
            genre,
        } = question;
        return <>
            <h2 className="game__title">Выберите {genre} треки</h2>
            <form className="game__tracks" onSubmit={(e) => {
                e.preventDefault();
                onAnswer(question, this.state.userAnswer, mistakes, maxMistakes);
                this.setState({
                    userAnswer: new Array(question.answers.length).fill(false),
                });
            }}>
                {answers.map((item, i) =>
                    <div key={`answer-${i}`} className="track">
                        {renderPlayer(item, i)}
                        <div className="game__answer">
                            <input className="game__input visually-hidden" type="checkbox" name="answer"
                                   value={this.state.userAnswer[i]}
                                   id={`answer-${i}`}
                                   checked={this.state.userAnswer[i]}
                                   onChange={() => {
                                       const userAnswer = [...this.state.userAnswer];
                                       userAnswer[i] = !userAnswer[i];
                                       this.setState({userAnswer});
                                   }}
                            />
                            <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                        </div>
                    </div>
                )}
                <button className="game__submit button" type="submit">Ответить</button>
            </form>
        </>
    }
}

GenreQuestionScreen.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: PropTypes.shape({
        answers: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired,
        })).isRequired,
        genre: PropTypes.string.isRequired,
        type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    }).isRequired,
    renderPlayer: PropTypes.func.isRequired,
};

export {GenreQuestionScreen}

const mapStateToProps = state => ({
    mistakes: state.mistakes,
    maxMistakes: state.maxMistakes,
});

export default connect(
    mapStateToProps
)(GenreQuestionScreen);

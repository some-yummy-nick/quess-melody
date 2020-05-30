import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../constants";
import {connect} from "react-redux";

const ArtistQuestionScreen = ({question: {answers, song}, onAnswer, mistakes, maxMistakes, renderPlayer}) =>
    <>
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
            <div className="track">
                {renderPlayer(song, 0)}
            </div>
        </div>
        <form className="game__artist">
            {answers.map((answer, i) => {
                return (
                    <div key={`answer-${i}`} className="artist">
                        <input className="artist__input visually-hidden" type="radio" name="answer"
                               value={`answer-${i}`}
                               id={`answer-${i}`}
                               onChange={(evt) => {
                                   evt.preventDefault();
                                   onAnswer({answers, song}, answer, mistakes, maxMistakes);
                               }}
                        />
                        <label className="artist__name" htmlFor={`answer-${i}`}>
                            <img className="artist__picture" src={answer.picture} alt={answer.artist}/>
                            {answer.artist}
                        </label>
                    </div>
                );
            })}
        </form>
    </>;

ArtistQuestionScreen.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: PropTypes.shape({
        answers: PropTypes.arrayOf(PropTypes.shape({
            artist: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        })).isRequired,
        song: PropTypes.shape({
            artist: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
        }).isRequired,
        type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    }).isRequired,
    renderPlayer: PropTypes.func.isRequired,
};
export {ArtistQuestionScreen};

const mapStateToProps = state => ({
    mistakes: state.mistakes,
    maxMistakes: state.maxMistakes,
});

export default connect(
    mapStateToProps
)(ArtistQuestionScreen);

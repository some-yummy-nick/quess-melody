import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Wrong = ({mistakes}) => {
    const countMistakes = new Array(mistakes).fill(``);
    return <div className="game__mistakes">
        {countMistakes && countMistakes.map((it, i) => <div key={`mistake-${i}`} className="wrong"/>)}
    </div>;
};

Wrong.propTypes = {
    mistakes: PropTypes.number
};

export {Wrong};

const mapStateToProps = (state) => ({
    mistakes: state.mistakes,
});

export default connect(
    mapStateToProps
)(Wrong);

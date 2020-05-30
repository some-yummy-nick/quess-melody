import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../actions";

class Timer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {time: {}, seconds: props.gameTime * 60};
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let divisorForMinutes = secs % (60 * 60);
        let minutes = Math.floor(divisorForMinutes / 60);

        let divisorForSeconds = divisorForMinutes % 60;
        let seconds = Math.ceil(divisorForSeconds);
        const obj = {};
        obj.m = minutes < 10 ? `0` + minutes : minutes;
        obj.s = seconds < 10 ? `0` + seconds : seconds;
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeftVar});
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.props.reset();
        }
    }


    render() {
        const {time} = this.state;
        return <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">{time.m}</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">{time.s}</span>
        </div>;
    }

}

Timer.propTypes = {
    gameTime: PropTypes.number,
    reset: PropTypes.func
};

export {Timer};

const mapStateToProps = (state) => ({
    gameTime: state.gameTime,
});

const mapDispatchToProps = (dispatch) => ({
    reset: () => dispatch(ActionCreator.reset()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer);

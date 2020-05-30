import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export class AudioPlayer extends PureComponent {
    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
        this.state = {
            progress: 0,
            isPlaying: props.isPlaying,
            isLoading: true,
        };
    }

    componentDidMount() {
        const {src} = this.props;
        const audio = this.audioRef.current;
        audio.src = src;
        audio.oncanplaythrough = () => this.setState({
            isLoading: false,
        });

        audio.onplay = () => {
            this.setState({
                isPlaying: true,
            });
        };

        audio.onpause = () => {
            this.setState({
                isPlaying: false,
            });
        };

        audio.ontimeupdate = () => this.setState({
            progress: audio.currentTime
        });
    }

    componentWillUnmount() {
        const audio = this.audioRef.current;
        audio.oncanplaythrough = null;
        audio.onplay = null;
        audio.onpause = null;
        audio.ontimeupdate = null;
        audio.src = ``;
    }

    componentDidUpdate() {
        const audio = this.audioRef.current;
        if (this.props.isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    render() {
        const {isPlaying} = this.state;
        const {onPlayButtonClick} = this.props;
        return <>
            <button className={`track__button track__button--${isPlaying ? `pause` : `play`}`} type="button"
                    onClick={onPlayButtonClick}/>
            <div className="track__status">
                <audio ref={this.audioRef}/>
            </div>
        </>;
    }
}

AudioPlayer.propTypes = {
    id: PropTypes.number,
    src: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func
};

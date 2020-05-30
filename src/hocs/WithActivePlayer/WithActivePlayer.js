import React, {PureComponent} from 'react';
import {AudioPlayer} from "../../components/AudioPlayer/AudioPlayer.jsx";

const withActivePlayer = (Component) => {
    class WithActivePlayer extends PureComponent {
        constructor(props) {
            super(props);

            this.state = {
                activePlayer: 0,
            };

        }

        render() {
            const {activePlayer} = this.state;

            return <Component
                {...this.props}
                renderPlayer={(it, i) => {
                    return <AudioPlayer
                        src={it.src}
                        isPlaying={i === activePlayer}
                        onPlayButtonClick={() => this.setState({
                            activePlayer: this.state.activePlayer === i ? -1 : i
                        })}
                    />;
                }}
            />;
        }
    }

    WithActivePlayer.propTypes = {};

    return WithActivePlayer;
};

export default withActivePlayer;

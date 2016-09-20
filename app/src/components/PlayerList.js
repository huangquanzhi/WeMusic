import React, {Component, PropTypes} from 'react';

const propTypes = {
    playlist: PropTypes.array,
    songPlaying: PropTypes.object,
    mode: PropTypes.string,
};

class Player extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {songPlaying} = this.props;
        return (
            <div className="player__list">


            </div>
        )
    }
}

Player.propTypes = propTypes;

export default Player;
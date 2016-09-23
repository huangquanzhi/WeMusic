import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
    SONG_PATH
} from '../constants/application';

import PlayerContainer from './PlayerContainer';
import ToolBarContainer from './ToolBarContainer';

const propTypes = {
    song: PropTypes.object,
};


class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.retrievePlayingSong = this.retrievePlayingSong.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {song} = this.props;
        if (song.songPlaying) {
            if (prevProps.songPlaying !== this.props.song.songPlaying) {
                const songObj = this.retrievePlayingSong();
                const url = SONG_PATH + songObj.cover;
                document.body.style.backgroundImage = "url('" + url + "')";
            }
        }
    }


    // retrieve the the current playing song
    // return Object
    retrievePlayingSong() {
        const {song} = this.props;
        let songObject = null;

        song.songList.map((data, index)=> {
            if (data.id === song.songPlaying) {
                songObject = song.songList[index];
            }
        });

        return songObject;
    }

    render() {
        const {song} = this.props;

        return (
            <main>
                <div>
                    <ToolBarContainer/>
                </div>
                <div>
                    <h1>{song.songPlaying}</h1>
                </div>
                <div>
                    <PlayerContainer/>
                </div>
            </main>
        );
    }
}

HomeContainer.propTypes = propTypes;


function mapStateToProps(state) {
    return {
        song: state.song,
    };
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
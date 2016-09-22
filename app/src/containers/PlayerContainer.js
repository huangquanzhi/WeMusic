import React, {Component, PropTypes} from 'react';
import * as _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import {
    SONG_PLAY_MODE_LOOP,
    SONG_PLAY_MODE_REPEAT
} from '../constants/song';

import Player from '../components/Player';
import * as songActionCreator from '../actions/song';
import SongPlayer from '../actions/player';

const propTypes = {
    song: PropTypes.object,
    songActions: PropTypes.object,
};


class SongContainer extends Component {
    constructor(props) {
        super(props);
        this.retrievePlayingSong = this.retrievePlayingSong.bind(this);
        this.playerController = new SongPlayer(this.props.songActions);
    }

    componentWillMount() {
        const {song, params} = this.props;
        let playMode = SONG_PLAY_MODE_REPEAT;

        if (params) {
            const songFounded = _.find(song.songList, (song) => {
                return song.id == params.songName;
            });

            if (songFounded) {
                playMode = SONG_PLAY_MODE_LOOP;
                this.playerController.song(songFounded.id);
            }
        }

        // change play mode and update the play list
        this.playerController.mode(playMode).updatePlayList();
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
            <div className="player">
                <Player
                    autoPlay={song.autoPlay}
                    isPlaying={song.isPlaying}
                    loadedSong={this.retrievePlayingSong()}
                    mode={song.playMode}
                    songs={song.songList}
                    controller={this.playerController}
                />
            </div>
        )
    }
}

SongContainer.propTypes = propTypes;


function mapStateToProps(state) {
    return {
        song: state.song,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        songActions: bindActionCreators(songActionCreator, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SongContainer));
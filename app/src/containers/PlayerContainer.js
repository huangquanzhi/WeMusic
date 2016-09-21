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

const propTypes = {
    song: PropTypes.object,
    songActions: PropTypes.object,
};


class SongContainer extends Component {
    constructor(props) {
        super(props);
        this.retrievePlayingSong = this.retrievePlayingSong.bind(this);
        this.handleRepeatReload = this.handleRepeatReload.bind(this);
        this.handlePlayPauseAction = this.handlePlayPauseAction.bind(this);
        this.handleSongChangeNext = this.handleSongChangeNext.bind(this);
        this.handleSongChangePrev = this.handleSongChangePrev.bind(this);
        this.handlePlayModeChange = this.handlePlayModeChange.bind(this);
        this.handleChangeSong = this.handleChangeSong.bind(this);
    }

    componentWillMount() {
        const {song, songActions, params} = this.props;

        let playMode = SONG_PLAY_MODE_REPEAT;

        if (params.songName) {
            const songFounded = _.find(song.songList, (song) => {
                return song.id == params.songName;
            });

            if (songFounded) {
                playMode = SONG_PLAY_MODE_LOOP;
                songActions.changeSong(songFounded.id);
            }
        }

        songActions.changePlayMode(playMode);
        songActions.changePlayList();
    }

    retrievePlayingSong() {
        const {song} = this.props;
        let playing = null;

        song.songList.map((data, index)=> {
            if (data.id === song.songPlaying) {
                playing = song.songList[index];
            }
        });

        return playing;
    }

    handleRepeatReload(node) {
        if (node) {
            node.load();
            node.play();
        }
    }

    handlePlayPauseAction(value = null) {
        const {song, songActions} = this.props;
        if (value != null) {
            songActions.isPlaying(value);
        } else {
            songActions.isPlaying(!song.isPlaying);
        }
    }

    handleSongChangeNext() {
        const {songActions} = this.props;
        songActions.changeNextSong();
        return {reload: this.handleRepeatReload}
    }

    handleSongChangePrev() {
        const {songActions} = this.props;
        songActions.changePrevSong();
        return {reload: this.handleRepeatReload}
    }

    handlePlayModeChange(value) {
        const {songActions} = this.props;
        songActions.changePlayMode(value);
        songActions.changePlayList();
    }

    handleChangeSong(v) {
        const {router, song, songActions} = this.props;
        songActions.changeSong(v);
        // update the list
        if (song.playMode == SONG_PLAY_MODE_LOOP) {
            songActions.changePlayList();
        }
    }

    render() {
        const {song} = this.props;
        return (
            <div className="player">
                <Player
                    autoPlay={song.autoPlay}
                    changeSong={this.handleChangeSong}
                    songs={song.songList}
                    loadedSong={this.retrievePlayingSong()}
                    onNext={this.handleSongChangeNext}
                    onPrev={this.handleSongChangePrev}
                    onPlay={this.handlePlayPauseAction}
                    onModeChange={this.handlePlayModeChange}
                    mode={song.playMode}
                    isPlaying={song.isPlaying}
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
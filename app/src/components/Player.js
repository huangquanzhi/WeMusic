import React, {Component, PropTypes} from 'react';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import AVPlay from 'material-ui/svg-icons/av/play-arrow';
import AVPause from 'material-ui/svg-icons/av/pause';
import AVNext from 'material-ui/svg-icons/av/skip-next';
import AVPrev from 'material-ui/svg-icons/av/skip-previous';
import AVLoop from 'material-ui/svg-icons/av/loop';
import AVRepeat from 'material-ui/svg-icons/av/repeat';
import AVShuffle from 'material-ui/svg-icons/av/shuffle';
import {SONG_PATH} from '../constants/application';
import {
    SONG_PLAY_MODE_LOOP,
    SONG_PLAY_MODE_REPEAT,
    SONG_PLAY_MODE_SHUFFLE
} from '../constants/song';

import PlayerList from './PlayerList';

const propTypes = {
    autoPlay: PropTypes.bool,
    changeSong: PropTypes.func,
    songs: PropTypes.array,
    songPlaying: PropTypes.object,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onPlay: PropTypes.func,
    onModeChange: PropTypes.func,
    mode: PropTypes.string,
    isPlaying: PropTypes.bool,
};

class Player extends Component {
    constructor(props) {
        super(props);
        this.retrieveAudioElement = this.retrieveAudioElement.bind(this);
        this.resetPlayerTimeDuration = this.resetPlayerTimeDuration.bind(this);
        this.handleLoadMeta = this.handleLoadMeta.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleSetTime = this.handleSetTime.bind(this);
        this.handleSongPlayClick = this.handleSongPlayClick.bind(this);
        this.handleSongEnded = this.handleSongEnded.bind(this);
        this.handlePlayNextSong = this.handlePlayNextSong.bind(this);
        this.handlePlayPrevSong = this.handlePlayPrevSong.bind(this);
        this.handleOnPlayListSongClick = this.handleOnPlayListSongClick.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.renderProgressBar = this.renderProgressBar.bind(this);
        this.renderSongPlay = this.renderSongPlay.bind(this);
        this.renderSongNext = this.renderSongNext.bind(this);
        this.renderSongPrev = this.renderSongPrev.bind(this);
        this.renderSongPlayMode = this.renderSongPlayMode.bind(this);
        this.renderPlayList = this.renderPlayList.bind(this);
        this.renderAudioPlayer = this.renderAudioPlayer.bind(this);
        this.state = {
            currentTime: 0,
            duration: 1,
        }

    }

    componentDidMount() {
        const {autoPlay, onPlay} = this.props;
        const audioNode = this.retrieveAudioElement();
        audioNode.addEventListener('loadedmetadata', this.handleLoadMeta, false);
        audioNode.addEventListener('timeupdate', this.handleTimeUpdate, false);
        audioNode.addEventListener('ended', this.handleSongEnded, false);

        if (autoPlay) {
            audioNode.play();
            onPlay(true);
        }
    }

    componentDidUpdate(prevProps) {
        const {onPlay, songPlaying} = this.props;
        if (songPlaying) {
            const audioNode = this.retrieveAudioElement();
            // new song auto play
            if (prevProps.songPlaying.id !== songPlaying.id) {
                this.resetPlayerTimeDuration();

                audioNode.play();
                onPlay(true);
            }
        }

    }

    retrieveAudioElement() {
        return document.getElementById('audioPlayer');
    }

    resetPlayerTimeDuration() {
        this.setState({
            currentTime: 0,
            duration: 1,
        });
    }

    handleLoadMeta() {
        const audioNode = this.retrieveAudioElement();
        const duration = ~~audioNode.duration + 1;
        this.setState({
            duration
        });
    }

    handleTimeUpdate(e) {
        const audioNode = e.currentTarget;
        const currentTime = ~~audioNode.currentTime;
        this.setState({
            currentTime
        });
    }

    handleSetTime(e, v) {
        const audioNode = this.retrieveAudioElement();
        // set the song current time
        audioNode.currentTime = v;

        this.setState({
            currentTime: v
        });
    }

    handleSongEnded() {
        const {onPlay, onNext, mode} = this.props;
        const audioNode = this.retrieveAudioElement();
        this.resetPlayerTimeDuration();

        // reload the song
        if (mode == SONG_PLAY_MODE_LOOP) {
            onNext().reload(audioNode);
            audioNode.play();
            onPlay(true);
        } else {
            onNext();
        }
    }

    handleSongPlayClick() {
        const {isPlaying, onPlay, songPlaying} = this.props;
        const audioNode = this.retrieveAudioElement();

        if (songPlaying) {
            if (isPlaying) {
                audioNode.pause();
            } else {
                audioNode.play();
            }
            // toggle play/pause
            onPlay();
        }
    }

    handlePlayNextSong() {
        const {onNext, songPlaying, mode} = this.props;
        if (songPlaying) {
            const audioNode = this.retrieveAudioElement();
            this.resetPlayerTimeDuration();
            // reload the song
            if (mode == SONG_PLAY_MODE_LOOP) {
                onNext().reload(audioNode);
            } else {
                onNext();
            }
        }
    }

    handlePlayPrevSong() {
        const {onPrev, songPlaying, mode} = this.props;
        if (songPlaying) {
            const audioNode = this.retrieveAudioElement();
            this.resetPlayerTimeDuration();
            // reload the song
            if (mode == SONG_PLAY_MODE_LOOP) {
                onPrev().reload(audioNode);
            } else {
                onPrev();
            }
        }
    }

    handleOnPlayListSongClick(id) {
        const {changeSong} = this.props;
        changeSong(id);
    }

    handleModeChange() {
        const {onModeChange, mode} = this.props;
        let nextMode = SONG_PLAY_MODE_REPEAT;
        switch (mode) {
            case SONG_PLAY_MODE_REPEAT:
                nextMode = SONG_PLAY_MODE_LOOP;
                break;
            case SONG_PLAY_MODE_LOOP:
                nextMode = SONG_PLAY_MODE_SHUFFLE;
                break;
            case SONG_PLAY_MODE_SHUFFLE:
                break;
        }
        onModeChange(nextMode);
    }

    renderProgressBar() {

        const {currentTime, duration} = this.state;


        const convertToMinutes = (sec) => {
            var minutes = ~~(sec / 60);
            var seconds = sec - (minutes * 60);

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return minutes + ':' + seconds;
        };

        return (
            <div>
                <label>Current: {convertToMinutes(currentTime)}</label>
                <Slider
                    value={currentTime}
                    min={0}
                    max={duration}
                    step={1}
                    onChange={this.handleSetTime}
                />
                <label>Duration:{convertToMinutes(duration - 1)}</label>
            </div>
        )
    }

    renderSongPlay() {
        const {isPlaying} = this.props;

        if (isPlaying) {
            return (
                <IconButton className="button__pause-song" onClick={this.handleSongPlayClick}>
                    <AVPause>Pause</AVPause>
                </IconButton>
            )
        }

        return (
            <IconButton className="button__play-song" onClick={this.handleSongPlayClick}>
                <AVPlay>Play</AVPlay>
            </IconButton>
        )
    }

    renderSongNext() {
        return (
            <IconButton className="button__next-song" onClick={this.handlePlayNextSong}>
                <AVNext>Next</AVNext>
            </IconButton>
        )
    }

    renderSongPrev() {
        return (
            <IconButton className="button__prev-song" onClick={this.handlePlayPrevSong}>
                <AVPrev>Prev</AVPrev>
            </IconButton>
        )
    }

    renderSongPlayMode() {
        const {mode} = this.props;

        let icon;
        switch (mode) {
            case SONG_PLAY_MODE_LOOP:
                icon = <AVLoop/>;
                break;
            case SONG_PLAY_MODE_REPEAT:
                icon = <AVRepeat/>;
                break;
            case SONG_PLAY_MODE_SHUFFLE:
                icon = <AVShuffle/>;
                break;
        }

        return (
            <IconButton className="button__play-mode" onClick={this.handleModeChange}>
                {icon}
            </IconButton>
        )

    }

    renderPlayList() {
        const {songs, songPlaying} = this.props;

        if (songPlaying) {
            return (
                <PlayerList
                    songPlaying={songPlaying}
                    playList={songs}
                    onSongClick={this.handleOnPlayListSongClick}
                />
            )
        }
    }

    renderAudioPlayer() {
        const {songPlaying} = this.props;
        if (songPlaying) {
            return (
                <audio
                    id="audioPlayer"
                    src={SONG_PATH + songPlaying.file}
                />
            )
        }
        return (
            <audio
                id="audioPlayer"
            />
        )
    }

    render() {
        return (
            <div className="player__bar">
                { this.renderSongPrev() }
                { this.renderSongPlay() }
                { this.renderSongNext() }
                { this.renderSongPlayMode() }
                { this.renderPlayList() }
                { this.renderProgressBar() }
                { this.renderAudioPlayer()}

            </div>
        )
    }
}

Player.propTypes = propTypes;

export default Player;
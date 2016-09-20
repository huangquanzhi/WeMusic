import React, {Component, PropTypes} from 'react';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import AVPlay from 'material-ui/svg-icons/av/play-arrow';
import AVPause from 'material-ui/svg-icons/av/pause';
import AVNext from 'material-ui/svg-icons/av/skip-next';
import AVPrev from 'material-ui/svg-icons/av/skip-previous';
import {SONG_PATH} from '../constants/application';

import PlayerList from './PlayerList';

const propTypes = {
    autoPlay: PropTypes.bool,
    changeSong: PropTypes.func,
    songs: PropTypes.array,
    songPlaying: PropTypes.object,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onPlay: PropTypes.func,
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
        this.renderProgressBar = this.renderProgressBar.bind(this);
        this.renderSongPlay = this.renderSongPlay.bind(this);
        this.renderSongNext = this.renderSongNext.bind(this);
        this.renderSongPrev = this.renderSongPrev.bind(this);
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

    componentDidUpdate(prevProps, prevState) {
        const {onPlay, songPlaying, mode} = this.props;
        const audioNode = this.retrieveAudioElement();
        // new song auto play
        if (prevProps.songPlaying.id !== songPlaying.id) {
            this.resetPlayerTimeDuration();

            audioNode.play();
            onPlay(true);
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
        const duration = ~~audioNode.duration + 2;
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
        if (mode == 'repeat') {
            onNext().reload(audioNode);
            audioNode.play();
            onPlay(true);
        } else {
            onNext();
        }
    }

    handleSongPlayClick() {
        const {isPlaying, onPlay} = this.props;
        const audioNode = this.retrieveAudioElement();

        if (isPlaying) {
            audioNode.pause();
        } else {
            audioNode.play();
        }
        // toggle play/pause
        onPlay();
    }

    handlePlayNextSong() {
        const {onNext, mode} = this.props;
        const audioNode = this.retrieveAudioElement();
        this.resetPlayerTimeDuration();

        // reload the song
        if (mode == 'repeat') {
            onNext().reload(audioNode);
        } else {
            onNext();
        }
    }

    handlePlayPrevSong() {
        const {onPrev} = this.props;
        const audioNode = this.retrieveAudioElement();
        this.resetPlayerTimeDuration();

        // reload the song
        if (mode == 'repeat') {
            onPrev().reload(audioNode);
        } else {
            onPrev();
        }
    }

    handleOnPlayListSongClick(id) {
        const {changeSong} = this.props;
        changeSong(id);
    }

    renderProgressBar() {

        const {currentTime, duration} = this.state;

        let currentMinutes = ~~(currentTime / 60);
        let currentSeconds = currentTime - currentMinutes * 60;

        let durationMinutes = ~~(duration / 60);
        let durationSeconds = duration - durationMinutes * 60;


        return (
            <div>
                <label>Current: {currentMinutes}:{currentSeconds}</label>
                <Slider
                    value={currentTime}
                    min={0}
                    max={duration}
                    step={1}
                    onChange={this.handleSetTime}
                />
                <label>Duration:{durationMinutes}:{durationSeconds}</label>
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

    render() {
        const {songs, songPlaying} = this.props;
        return (
            <div className="player__bar">
                { this.renderSongPrev() }
                { this.renderSongPlay() }
                { this.renderSongNext() }
                <PlayerList
                    songPlaying={songPlaying}
                    playList={songs}
                    onSongClick={this.handleOnPlayListSongClick}
                />
                { this.renderProgressBar() }
                <audio
                    id="audioPlayer"
                    src={SONG_PATH + songPlaying.file}
                />

            </div>
        )
    }
}

Player.propTypes = propTypes;

export default Player;
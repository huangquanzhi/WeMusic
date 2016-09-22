import React, {Component, PropTypes} from 'react';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames';
import AVPlay from 'material-ui/svg-icons/av/play-arrow';
import AVPause from 'material-ui/svg-icons/av/pause';
import AVNext from 'material-ui/svg-icons/av/skip-next';
import AVPrev from 'material-ui/svg-icons/av/skip-previous';
import AVLoop from 'material-ui/svg-icons/av/loop';
import AVRepeat from 'material-ui/svg-icons/av/repeat';
import AVShuffle from 'material-ui/svg-icons/av/shuffle';
import AVQueueMusic from 'material-ui/svg-icons/av/queue-music';
import {SONG_PATH} from '../constants/application';
import {
    SONG_PLAY_MODE_LOOP,
    SONG_PLAY_MODE_REPEAT,
    SONG_PLAY_MODE_SHUFFLE
} from '../constants/song';

import PlayerList from './PlayerList';

const styles = {
    smallIcon: {
        width: 36,
        height: 36,
    },
    mediumIcon: {
        width: 48,
        height: 48,
    },
    largeIcon: {
        width: 60,
        height: 60,
    },
    small: {
        width: 72,
        height: 72,
        padding: 16,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    large: {
        width: 120,
        height: 120,
        padding: 30,
    },
};

const propTypes = {
    autoPlay: PropTypes.bool,
    controller: PropTypes.object,
    isPlaying: PropTypes.bool,
    loadedSong: PropTypes.object,
    songs: PropTypes.array,
    mode: PropTypes.string,
};

class Player extends Component {
    constructor(props) {
        super(props);
        this.handleLoadMeta = this.handleLoadMeta.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleSetTime = this.handleSetTime.bind(this);
        this.handleSongPlayClick = this.handleSongPlayClick.bind(this);
        this.handleSongEnded = this.handleSongEnded.bind(this);
        this.handlePlayNextSong = this.handlePlayNextSong.bind(this);
        this.handlePlayPrevSong = this.handlePlayPrevSong.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleShowPlayListClick = this.handleShowPlayListClick.bind(this);
        this.renderProgressBar = this.renderProgressBar.bind(this);
        this.renderSongPlay = this.renderSongPlay.bind(this);
        this.renderSongNext = this.renderSongNext.bind(this);
        this.renderSongPrev = this.renderSongPrev.bind(this);
        this.renderSongPlayMode = this.renderSongPlayMode.bind(this);
        this.renderQueueMusic = this.renderQueueMusic.bind(this);
        this.renderPlayList = this.renderPlayList.bind(this);
        this.renderAudioPlayer = this.renderAudioPlayer.bind(this);
        this.state = {
            currentTime: 0,
            duration: 1,
            showPlayList: false,
        }

    }

    componentDidMount() {
        const {autoPlay, controller} = this.props;
        // set the player node
        controller.setPlayer(document.getElementById('audioPlayer'), (el) => {
            el.addEventListener('loadedmetadata', this.handleLoadMeta, false);
            el.addEventListener('timeupdate', this.handleTimeUpdate, false);
            el.addEventListener('ended', this.handleSongEnded, false);
        });

        if (controller.playerNode !== null && autoPlay) {
            controller.isPlaying(true);
        }
    }

    componentDidUpdate(prevProps) {
        const {controller, loadedSong} = this.props;

        // if there is song being selected
        if (loadedSong) {
            // new song auto play
            if (prevProps.loadedSong !== loadedSong) {
                // reset timer and start playing
                controller
                    .isPlaying(true);
            }
        }

    }

    // load the audio's properties
    handleLoadMeta() {
        const {controller} = this.props;
        // set the player duration
        controller.duration = ~~controller.playerNode.duration + 2;
        this.setState({
            duration: controller.duration
        });
    }

    // set the displaying time
    handleTimeUpdate(e) {
        const {controller} = this.props;
        // set the player duration
        controller.currentTime = ~~controller.playerNode.currentTime;
        this.setState({
            currentTime: controller.currentTime
        });
    }


    handleSetTime(e, v) {
        const {controller} = this.props;

        // set the song current time
        controller.currentTime = v;
        controller.playerNode.currentTime = v;
        this.setState({
            currentTime: controller.currentTime
        });
    }

    handleSongEnded() {
        const {controller} = this.props;

        controller
            .resetTime()
            .next()
            .reload();

        this.setState({
            currentTime: controller.currentTime,
            duration: controller.duration
        })

    }

    handleSongPlayClick() {
        const {controller, isPlaying, loadedSong} = this.props;

        if (loadedSong) {
            controller.isPlaying(!isPlaying);
        }
    }

    handlePlayNextSong() {
        const {controller, loadedSong} = this.props;
        if (loadedSong) {
            controller
                .resetTime()
                .next()
                .reload();

            this.setState({
                currentTime: controller.currentTime,
                duration: controller.duration
            })
        }
    }

    handlePlayPrevSong() {
        const {controller, loadedSong} = this.props;
        if (loadedSong) {
            controller
                .resetTime()
                .prev()
                .reload();

            this.setState({
                currentTime: controller.currentTime,
                duration: controller.duration
            })
        }
    }


    // change the player mode - loop repeat shuffle
    handleModeChange() {
        const {controller, mode} = this.props;
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
        // change mode
        controller
            .mode(nextMode)
            .updatePlayList();
    }

    handleShowPlayListClick(value) {
        this.setState({
            showPlayList: !this.state.showPlayList
        })
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
            <div className="player__progress">
                <div className="player__progress-current-time">
                    <label>Current: {convertToMinutes(currentTime)}</label>
                </div>
                <div className="player__progress-bar">
                    <Slider
                        value={currentTime}
                        min={0}
                        max={duration}
                        step={1}
                        onChange={this.handleSetTime}
                    />
                </div>
                <div className="player__progress-duration-time">
                    <label>Duration:{convertToMinutes(duration - 1)}</label>
                </div>
            </div>
        )
    }

    renderSongPlay() {
        const {isPlaying} = this.props;

        const icon = isPlaying ? <AVPause>Pause</AVPause> : <AVPlay>Play</AVPlay>

        return (
            <IconButton
                className={classNames({
                    "button__play-song": isPlaying,
                    "button__pause-song": !isPlaying
                })
                }
                iconStyle={styles.mediumIcon}
                style={styles.medium}
                onClick={this.handleSongPlayClick}
            >
                {icon}
            </IconButton>
        );
    }

    renderSongNext() {
        return (
            <IconButton
                className="button__next-song"
                iconStyle={styles.mediumIcon}
                style={styles.medium}
                onClick={this.handlePlayNextSong}
            >
                <AVNext>Next</AVNext>
            </IconButton>
        );
    }

    renderSongPrev() {
        return (
            <IconButton
                className="button__prev-song"
                iconStyle={styles.mediumIcon}
                style={styles.medium}
                onClick={this.handlePlayPrevSong}
            >
                <AVPrev>Prev</AVPrev>
            </IconButton>
        );
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
            <IconButton
                className="button__play-mode"
                iconStyle={styles.mediumIcon}
                style={styles.medium}
                onClick={this.handleModeChange}
            >
                {icon}
            </IconButton>
        );

    }

    renderQueueMusic() {
        return (
            <IconButton
                className="button__queue-music"
                iconStyle={styles.mediumIcon}
                style={styles.medium}
                onClick={this.handleShowPlayListClick}
            >
                <AVQueueMusic/>
            </IconButton>
        );
    }

    renderPlayList() {
        const {controller, songs, loadedSong} = this.props;

        return (
            <Dialog
                title="Music List"
                modal={false}
                open={this.state.showPlayList}
                onRequestClose={this.handleShowPlayListClick}
                autoScrollBodyContent={true}
            >
                <PlayerList
                    loadedSong={loadedSong}
                    playList={songs}
                    onSongClick={controller.song}
                />
            </Dialog>
        )
    }

    renderAudioPlayer() {
        const {loadedSong} = this.props;
        if (loadedSong) {
            return (
                <audio
                    id="audioPlayer"
                    src={SONG_PATH + loadedSong.file}
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
                { this.renderProgressBar() }
                { this.renderAudioPlayer()}
                <div className="player__controls">
                    <div className="player__controls__play-mode">
                        { this.renderSongPlayMode() }
                    </div>
                    <div className="player__controls__prev-song">
                        { this.renderSongPrev() }
                    </div>
                    <div className="player__controls__play-song">
                        { this.renderSongPlay() }
                    </div>
                    <div className="player__controls__next-song">
                        { this.renderSongNext() }
                    </div>
                    <div className="player__controls__queue-music">
                        { this.renderQueueMusic()}
                    </div>
                </div>
                { this.renderPlayList()}
            </div>
        )
    }
}

Player.propTypes = propTypes;

export default Player;
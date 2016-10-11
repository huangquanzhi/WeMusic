import React, {Component, PropTypes} from 'react';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
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
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    dialog: {
        width: '100%',
        maxWidth: 'none',
    }
};

const propTypes = {
    autoPlay: PropTypes.bool,
    controller: PropTypes.object,
    isPlaying: PropTypes.bool,
    loadedSong: PropTypes.object,
    songs: PropTypes.array,
    settings: PropTypes.object,
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
        const {controller, isPlaying, loadedSong} = this.props;

        // if there is song being selected
        if (loadedSong) {

            // new song auto play
            if (prevProps.loadedSong !== loadedSong) {
                console.log("Play new song")
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
        const {controller, mode} = this.props;

        if (mode === SONG_PLAY_MODE_LOOP) {
            controller
                .resetTime()
                .replay();
        } else {
            controller
                .resetTime()
                .next();
        }

        console.log("Song Ended")
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
        const {controller, loadedSong, mode} = this.props;
        if (loadedSong) {
            if (mode === SONG_PLAY_MODE_LOOP) {
                controller
                    .resetTime()
                    .replay();
            } else {
                controller
                    .resetTime()
                    .next()
                    .reload();
            }
            this.setState({
                currentTime: controller.currentTime,
                duration: controller.duration
            })
        }
    }

    handlePlayPrevSong() {
        const {controller, loadedSong, mode} = this.props;
        if (loadedSong) {
            if (mode === SONG_PLAY_MODE_LOOP) {
                controller
                    .resetTime()
                    .replay();
            } else {
                controller
                    .resetTime()
                    .prev()
                    .reload();
            }
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
            <div className="row player__progress">
                <div className="col-xs-2 player__progress-current-time">
                    <label>{convertToMinutes(currentTime)}</label>
                </div>
                <div className="col-xs-8 player__progress-bar">
                    <Slider
                        value={currentTime}
                        min={0}
                        max={duration}
                        step={1}
                        onChange={this.handleSetTime}
                    />
                </div>
                <div className="col-xs-2 player__progress-duration-time">
                    <label>{convertToMinutes(duration - 1)}</label>
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
                tooltip={!isPlaying ? "Play" : "Pause"}
                tooltipPosition="top-right"
                iconStyle={styles.smallIcon}
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
                iconStyle={styles.smallIcon}
                style={styles.medium}
                tooltip="Next"
                tooltipPosition="top-right"
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
                iconStyle={styles.smallIcon}
                style={styles.medium}
                tooltip="Prev"
                tooltipPosition="top-right"
                onClick={this.handlePlayPrevSong}
            >
                <AVPrev>Prev</AVPrev>
            </IconButton>
        );
    }

    renderSongPlayMode() {
        const {mode} = this.props;

        let icon;
        let tips = "";

        switch (mode) {
            case SONG_PLAY_MODE_LOOP:
                icon = <AVLoop/>;
                tips = "Loop";
                break;
            case SONG_PLAY_MODE_REPEAT:
                icon = <AVRepeat/>;
                tips = "Repeat";
                break;
            case SONG_PLAY_MODE_SHUFFLE:
                icon = <AVShuffle/>;
                tips = "Shuffle";
                break;
        }

        return (
            <IconButton
                className="button__play-mode"
                iconStyle={styles.smallIcon}
                style={styles.medium}
                tooltip={tips}
                tooltipPosition="top-right"
                onClick={this.handleModeChange}
            >
                {icon}
            </IconButton>
        );

    }

    renderQueueMusic() {
        const {songs} = this.props;

        return (
            <Badge
                className="button__queue-badge"
                badgeContent={songs.length}
                primary={true}
                badgeStyle={{top: 30, right: 30}}
            >
                <IconButton
                    className="button__queue-music"
                    iconStyle={styles.smallIcon}
                    style={styles.medium}
                    tooltip="Play list"
                    tooltipPosition="top-right"
                    onClick={this.handleShowPlayListClick}
                >
                    <AVQueueMusic/>
                </IconButton>
            </Badge>
        );
    }

    renderPlayList() {
        const {controller, songs, loadedSong} = this.props;

        return (
            <Dialog
                title="Music List"
                modal={false}
                contentStyle={styles.dialog}
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
        const {settings} = this.props;
        return (
            <Paper
                className="player__bar"
                zDepth={5}
                rounded={false}
                style={{backgroundColor: settings.theme.playerColor}}
            >
                { this.renderProgressBar() }
                { this.renderAudioPlayer()}
                <div className="row player__controls">
                    <div className="col-xs-2 player__controls__play-mode">
                        { this.renderSongPlayMode() }
                    </div>
                    <div className="col-xs-2 player__controls__prev-song">
                        { this.renderSongPrev() }
                    </div>
                    <div className="col-xs-4 player__controls__play-song">
                        { this.renderSongPlay() }
                    </div>
                    <div className="col-xs-2 player__controls__next-song">
                        { this.renderSongNext() }
                    </div>
                    <div className="col-xs-2 player__controls__queue-music">
                        { this.renderQueueMusic()}
                    </div>
                </div>
                { this.renderPlayList()}
            </Paper>
        )
    }
}

Player.propTypes = propTypes;

export default Player;
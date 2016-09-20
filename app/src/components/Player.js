import React, { Component, PropTypes } from 'react';
import Slider from 'material-ui/Slider';
import { SONG_PATH } from '../constants/application';


const propTypes = {
  autoPlay: PropTypes.bool,
  songs: PropTypes.array,
  songPlaying: PropTypes.object,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onPlay: PropTypes.func,
  isPlaying: PropTypes.bool,
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.retrieveAudioElement = this.retrieveAudioElement.bind(this);
    this.handleLoadMeta = this.handleLoadMeta.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleSetTime = this.handleSetTime.bind(this);
    this.handleSongPlayClick = this.handleSongPlayClick.bind(this);
    this.handleSongEnded = this.handleSongEnded.bind(this);
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
    const { autoPlay, onPlay } = this.props;
    const audioNode = this.retrieveAudioElement();
    audioNode.addEventListener('loadedmetadata', this.handleLoadMeta, false);
    audioNode.addEventListener('timeupdate', this.handleTimeUpdate, false);
    audioNode.addEventListener('ended', this.handleSongEnded, false);

    if(autoPlay) {
      audioNode.play();
      onPlay(true);
    }
  }

  retrieveAudioElement() {
    return document.getElementById('audioPlayer');
  }

  handleLoadMeta() {
    const audioNode = this.retrieveAudioElement();
    const duration = Math.floor(audioNode.duration) + 2;
    this.setState({
      duration
    });
  }

  handleTimeUpdate(e) {
    const audioNode = e.currentTarget;
    const currentTime = Math.floor(audioNode.currentTime);
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
    const { onNext } = this.props;
    this.setState({
      currentTime: 0,
      duration: 1,
    });
    onNext();
  }

  handleSongPlayClick() {
    const { isPlaying, onPlay } = this.props;
    const audioNode = this.retrieveAudioElement();

    if (isPlaying) {
      audioNode.pause();
    } else {
      audioNode.play();
    }
    // toggle play/pause
    onPlay();
  }

  renderProgressBar() {
    return (
      <div>
        <label>Current: { this.state.currentTime}</label>
        <Slider
          value={this.state.currentTime}
          min={0}
          max={this.state.duration}
          onChange={this.handleSetTime}
        />
        <label>Duration: { this.state.duration }</label>
      </div>
    )
  }

  renderSongPlay() {
    const { isPlaying } = this.props;

    if (isPlaying) {
      return (
        <div className="button__pause-song">
          <button onClick={this.handleSongPlayClick}>Pause</button>
        </div>
      )
    }

    return (
      <div className="button__play-song">
        <button onClick={this.handleSongPlayClick}>Play</button>
      </div>
    )
  }

  renderSongNext() {
    const { onNext } = this.props;
    return (
      <div className="button__next-song">
        <button onClick={onNext}>Next</button>
      </div>
    )
  }

  renderSongPrev() {
    const { onPrev } = this.props;
    return (
      <div className="button__prev-song">
        <button onClick={onPrev}>Prev</button>
      </div>
    )
  }

  render() {
    const { songPlaying } = this.props;
    return (
      <div className="player__bar">
        <h1>Player</h1>
        { this.renderSongPrev() }
        { this.renderSongPlay() }
        { this.renderProgressBar() }
        <audio
          id="audioPlayer"
          src={SONG_PATH + songPlaying.file}
        />
        { this.renderSongNext() }
      </div>
    )
  }
}

Player.propTypes = propTypes;

export default Player;
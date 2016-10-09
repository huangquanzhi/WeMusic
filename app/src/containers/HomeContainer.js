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
    this.retrieveSongCover = this.retrieveSongCover.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {song} = this.props;
    // if song is playing
    if (song.songPlaying) {
      // not the same song
      if (prevProps.songPlaying !== this.props.song.songPlaying) {
        const songObj = this.retrievePlayingSong();
        // get the cover image url
        const url = SONG_PATH + songObj.cover;
        // document.getElementsByClassName("home__album__cover")[0].style.backgroundImage = "url('" + url + "')";
      }
    }
  }

  // retrieve the the current playing song
  // return song Object
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

  retrieveSongCover() {
    const {song} = this.props;

    let url = "";

    if (song.songPlaying) {
      const songObj = this.retrievePlayingSong();
      url = SONG_PATH + songObj.cover;

    }
    return url;
  }


  render() {
    const {song} = this.props;

    return (
        <main>
            <ToolBarContainer
                title={song.songPlaying}
            />
          <div className="home__album row">
            <div className="home__album__cover span-1-of-2">
              <img
                  src={this.retrieveSongCover()}
                  alt="cover"
              />
            </div>
            <div className="home__album__details span-1-of-2">
            </div>
          </div>
            <PlayerContainer/>
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
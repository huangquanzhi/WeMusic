import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
    SONG_PATH
} from '../constants/application';

import AuthService from '../utils/AuthService';
import PlayerContainer from './PlayerContainer';
import ToolBarContainer from './ToolBarContainer';


const propTypes = {
    song: PropTypes.object,
    user: PropTypes.object,
    route: PropTypes.object
};

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.retrievePlayingSong = this.retrievePlayingSong.bind(this);
        this.retrieveSongCover = this.retrieveSongCover.bind(this);
        this.renderCoverImage = this.renderCoverImage.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {song} = this.props;
        // if song is playing
        if (song.songPlaying) {
            // not the same song
            if (prevProps.songPlaying !== this.props.song.songPlaying) {
                const songObj = this.retrievePlayingSong();
                // get the cover image url
                const url = SONG_PATH + "/" + songObj.cover;
                document.getElementsByClassName("home__album")[0].style.backgroundImage = "url('" + url + "')";
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
            url = SONG_PATH + "/" + songObj.cover;

        }
        return url;
    }

    renderCoverImage() {
        const {song} = this.props;

        if (song.songPlaying) {
            return (
                <img
                    src={this.retrieveSongCover()}
                    alt="cover"
                    width="600"
                    height="600"
                />
            )
        }
    }

    render() {
        const {song, route, user} = this.props;

        return (
            <main>
                <ToolBarContainer
                    auth={route.auth}
                    title={song.songPlaying}
                    user={user}
                />
                <div className="container-fluid home__album">
                    <div className="col-md-6 home__album__cover">
                        { this.renderCoverImage() }
                    </div>
                    <div className="col-md-6 home__album__details">
                        <div className="row">

                        </div>
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
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
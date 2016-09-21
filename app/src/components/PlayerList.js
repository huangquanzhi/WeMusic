import React, {Component, PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';

let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {
    const propTypes = {
        children: PropTypes.node.isRequired,
        onChange: PropTypes.func,
        value: PropTypes.string,
    };

    class SelectableList extends Component {
        constructor(props) {
            super(props);
            this.handleRequestChange = this.handleRequestChange.bind(this);
        }

        handleRequestChange(event, value) {
            const {onChange} = this.props;
            onChange(value);
        };

        render() {
            const {value} = this.props;
            return (
                <ComposedComponent
                    value={value}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    }

    SelectableList.propTypes = propTypes;

    return SelectableList;
}

SelectableList = wrapState(SelectableList);


const propTypes = {
    playList: PropTypes.array,
    loadedSong: PropTypes.object,
    mode: PropTypes.string,
    onSongClick: PropTypes.func,
};


class Player extends Component {
    constructor(props) {
        super(props);
        this.handleSongClick = this.handleSongClick.bind(this);
        this.renderPlaylistSongs = this.renderPlaylistSongs.bind(this);
    }


    handleSongClick(value) {
        const {onSongClick} = this.props;
        onSongClick(value);
    }

    renderPlaylistSongs() {
        const {playList} = this.props;

        if (playList.length > 0) {
            return playList.map((song) => {
                return (
                    <ListItem
                        key={"song_" + song.id}
                        value={song.id}
                        primaryText={song.file}
                    />
                )
            })
        }
    }

    render() {
        const {loadedSong} = this.props;

        const loadedSongID = loadedSong? loadedSong.id: '';

        return (
            <div className="player__list">
                <SelectableList
                    onChange={this.handleSongClick}
                    value={loadedSongID}
                >
                    { this.renderPlaylistSongs() }
                </SelectableList>
            </div>
        );
    }
}

Player.propTypes = propTypes;

export default Player;
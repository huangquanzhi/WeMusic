import * as _ from 'lodash';

import {
    SONG_CHANGE_PLAYING,
    SONG_PLAYER_STATUS,
    SONG_CHANGE_PLAY_MODE,
    SONG_PLAYLIST_CHANGE,
    SONG_PLAY_MODE_LOOP,
    SONG_PLAY_MODE_REPEAT,
    SONG_PLAY_MODE_SHUFFLE
} from '../constants/song';

export const changeSong = (songID) => ({
    type: SONG_CHANGE_PLAYING,
    id: songID
});

export const changePlayList = () => {
    return (dispatch, getState) => {
        const {song} = getState();

        switch (song.playMode) {
            case SONG_PLAY_MODE_REPEAT:
                // setting song list with repeat mode
                dispatch(setPlayList(song.songList));
                break;
            case SONG_PLAY_MODE_LOOP:
                // set only one song in the play list

                let repeatSongIndex = 0;

                // searching for song
                song.songList.map((s, index) => {
                    if (s.id == song.songPlaying) {
                        repeatSongIndex = index;
                    }
                });

                dispatch(setPlayList([song.songList[repeatSongIndex]]));
                break;
            case SONG_PLAY_MODE_SHUFFLE:
                dispatch(setPlayList(_.shuffle(song.songList)));
                break;
        }
    }
};

export const setPlayList = (playList) => {
    return {type: SONG_PLAYLIST_CHANGE, list: playList};
};

export const changePlayMode = (mode) => {
    return {type: SONG_CHANGE_PLAY_MODE, mode};
};


export const isPlaying = (status) => {
    return {type: SONG_PLAYER_STATUS, status}
};

export const changeNextSong = () => {
    return (dispatch, getState) => {
        const {song} = getState();
        const playList = song.playList;
        // set default next song if cant find any
        let nextSong = playList.length > 0 ?
            playList[0].id : song.songPlaying;
        // searching for matching id
        playList.map((data, index) => {
            //found playing song
            if (data.id == song.songPlaying) {
                if (playList[index + 1] !== undefined) {
                    // next song available
                    nextSong = playList[index + 1].id;
                }
            }
        });
        dispatch(changeSong(nextSong));
    }
};

export const changePrevSong = () => {
    return (dispatch, getState) => {
        const {song} = getState();
        const playList = song.playList;
        // set default prev song if cant find any
        let prevSong = playList.length > 0 ?
            playList[playList.length - 1].id : song.songPlaying;
        // searching for matching id
        playList.map((data, index) => {
            //found playing song
            if (data.id == song.songPlaying) {
                if (playList[index - 1] !== undefined) {
                    // prev song available
                    prevSong = playList[index - 1].id;
                }
                // end of playlist
            }
        });
        dispatch(changeSong(prevSong));
    }
};

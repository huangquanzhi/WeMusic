import {
  SONG_CHANGE_PLAYING,
  SONG_PLAYER_STATUS
} from '../constants/song';

export const changeSong = (songID) => ({
  type: SONG_CHANGE_PLAYING,
  id: songID
});

export const isPlaying = (status) => {
  return { type: SONG_PLAYER_STATUS, status}
};

export const changeNextSong = () => {
  return (dispatch, getState) => {
    const { song } = getState();
    const playList = song.songList;
    // set default next song if cant find any
    let nextSongID = song.songPlaying;
    // searching for matching id
    playList.map((data, index) => {
      //found playing song
      if (data.id === song.songPlaying) {
        if (playList[index + 1] !== undefined) {
          // next song available
          nextSongID = playList[index + 1].id;
        } else {
          // go to the beginning of play list
          nextSongID = playList[0].id;
        }
      }
    });
    dispatch(changeSong(nextSongID));
  }
};

export const changePrevSong = () => {
  return (dispatch, getState) => {
    const { song } = getState();
    const playList = song.songList;
    // set default prev song if cant find any
    let nextSongID = song.songPlaying;
    // searching for matching id
    playList.map((data, index) => {
      //found playing song
      if (data.id === song.songPlaying) {
        if (playList[index - 1] !== undefined) {
          // next song available
          nextSongID = playList[index - 1].id;
        } else {
          // go to the beginning of play list
          nextSongID = playList[playList.length - 1].id;
        }
      }
    });
    dispatch(changeSong(nextSongID));
  }
};
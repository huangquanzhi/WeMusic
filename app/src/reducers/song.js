import {
  SONG_CHANGE_PLAYING,
  SONG_PLAYER_STATUS
} from '../constants/song';

const initialState = {
  songPlaying: 0,
  isPlaying: false,
  songList: [
    {
      id: 0,
      file: 'Adele - Hello/song.mp3',
      meta: '',
    },
    {
      id: 1,
      file: 'MV Apink(에이핑크)NoNoNo/song.mp3',
      meta: '',
    },
    {
      id: 2,
      file: 'MV Apink(에이핑크)My My/song.mp3',
      meta: '',
    }
  ]
};

const song = (state = initialState, action) => {
  switch (action.type) {
    case SONG_CHANGE_PLAYING:
      return Object.assign({}, state, {
        songPlaying: action.id
      });
    case SONG_PLAYER_STATUS:
      return Object.assign({}, state, {
        isPlaying: action.status
      });
    default:
      return state;
  }
};

export default song;
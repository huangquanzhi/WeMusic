import {
    FILE_UPLOADING,
    FILE_SET_FILES,
    FILE_SET_COVERS
} from '../constants/uploads';


/* play mode:
 loop, repeat, shuffle,
 */
const initialState = {
  files: [],
  covers: [],
  uploading: false,
};

const uploads = (state = initialState, action) => {
  switch (action.type) {
    case FILE_UPLOADING:
      return Object.assign({}, state, {
        uploading: action.status,
      });
    case FILE_SET_FILES:
      return Object.assign({}, state, {
        files: [...state.files, ...action.files]
      });
    case FILE_SET_COVERS:
      return Object.assign({}, state, {
        covers: [...state.covers, ...action.covers]
      });
    default:
      return state;
  }
};

export default uploads;
import {
  ROUTES_SET_PAGE
} from '../constants/routes';

const initialState = {
  pageType: 'home',
};

const routes = (state = initialState, action) => {
  switch (action.type) {
    case ROUTES_SET_PAGE:
      return Object.assign({}, state, {
        pageType: action.pageType,
      });
    default:
      return state;
  }
};

export default routes;
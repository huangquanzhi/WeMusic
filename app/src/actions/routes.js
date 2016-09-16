import {
  ROUTES_SET_PAGE
} from '../constants/routes';

export const setPage = (pageType, pageNumber) => ({
  type: ROUTES_SET_PAGE,
  pageType,
  pageNumber,
});
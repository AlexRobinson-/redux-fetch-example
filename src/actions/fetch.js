import { fetchAction as rawFetchAction } from 'alexs-redux-fetch/fetch/actions';
import { fetchSelectors } from './../reducers';

export const fetchAction = (ref, promise, optimistic) => rawFetchAction(ref, promise, { fetchSelectors, optimistic })
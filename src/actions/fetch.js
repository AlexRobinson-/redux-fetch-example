import { fetchAction as rawFetchAction } from './../redux-helpers/modules/fetch/actions';
import { fetchSelectors } from './../reducers';

export const fetchAction = (ref, promise, optimistic) => rawFetchAction(ref, promise, { fetchSelectors, optimistic })
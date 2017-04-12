import {
  FETCHING,
  LOADED,
  FAILED
} from './constants';

const createFetchReducer = () => {
  const statusConfig = {};
  const failedCountConfig = {};
  const slowConfig = {};

  const registerActions = (ref, {request, success, failure}) => {
    statusConfig[request] = [action => action.payload.ref, FETCHING]
    statusConfig[success] = [action => action.payload.ref, LOADED]
    statusConfig[failure] = [action => action.payload.ref, FAILED]

    failedCountConfig[success] = [action => action.payload.ref, 0]
    failedCountConfig[failure] = [action => action.payload.ref, state => state + 1]

    slowConfig[request] = [action => action.payload.ref, null]
    slowConfig[success] = [action => action.payload.ref, null]
    slowConfig[failure] = [action => action.payload.ref, null]
  }

  return {
    getStatusConfig: () => ({...statusConfig}),
    getFailedCountConfig: () => ({...failedCountConfig}),
    getSlowConfig: () => ({...slowConfig}),
    registerActions
  }
}

export default createFetchReducer;

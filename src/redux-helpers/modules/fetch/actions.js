import action from './../../utils/actions/action'
import {
  SLOW_CONNECTION,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from './constants'

export const slowConnection = ref => action(SLOW_CONNECTION, { ref })

export const fetchRequest = (ref, payload = {}, ...params) => action(FETCH_REQUEST, { ...payload, ref }, ...params)
export const fetchSuccess = (ref, payload = {}, ...params) => action(FETCH_SUCCESS, { ...payload, ref }, ...params)
export const fetchFailure = (ref, payload = {}, ...params) => action(FETCH_FAILURE, { ...payload, ref }, ...params)

const slowConnectionTimer = () => new Promise(res => {
  setTimeout(() => res({ slow: true }), 3000)
})

const wrapPromise = async promise => {
  const response = await promise
  return { response }
}

export const connectionStats = (ref, promise) => async dispatch => {
  /* Check for a slow connection */
  const { slow } = await Promise.race([
    wrapPromise(promise),
    slowConnectionTimer()
  ])

  if (slow) {
    dispatch(slowConnection(ref))
  }
}


export const fetchAction = (ref, promise) => async dispatch => {
  dispatch(fetchRequest(ref))
  dispatch(connectionStats(ref, promise))

  const { response, error } = await promise

  if (error) {
    dispatch(fetchFailure(ref))
    return { error }
  }

  dispatch(fetchSuccess(ref, { response }))

  return { response }
}

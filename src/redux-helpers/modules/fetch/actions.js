import action from './../../utils/actions/action'
import {
  SLOW_CONNECTION,
  REQUEST,
  SUCCESS,
  FAILURE
} from './constants'
import { selectors } from './reducer'

export const slowConnection = ref => action(SLOW_CONNECTION, { ref })

const _fetchAction = (payload = {}, meta = {}, ref, status) => action(
  `${ref}_${status}`,
  payload,
  { ...meta, fetch: { ref, type: status } }
)

export const fetchRequest = (ref, payload, meta) => _fetchAction(payload, meta, ref, REQUEST)
export const fetchSuccess = (ref, payload, meta) => _fetchAction(payload, meta, ref, SUCCESS)
export const fetchFailure = (ref, payload, meta) => _fetchAction(payload, meta, ref, FAILURE)

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

export const optimisticUpdate = (ref, optimisticEntities) => action(
  'OPTIMISTIC_UPDATE',
  {
    ref,
    optimisticEntities
  }
)

export const cancelOptimisticUpdate = ref => action(
  'CANCEL_OPTIMISTIC_UPDATE',
  {
    ref
  }
)

export const fetchAction = (ref, promise, { fetchSelectors = selectors, optimistic } = {}) => async (dispatch, getState) => {
  if (fetchSelectors.getIsLoading(getState(), ref)) {
    return;
  }

  if (optimistic) {
    dispatch(optimisticUpdate(ref, optimistic))
  }
  dispatch(fetchRequest(ref))
  dispatch(connectionStats(ref, promise))

  const { response, error } = await promise

  if (error) {
    dispatch(fetchFailure(ref))
    return { error }
  }

  dispatch(fetchSuccess(ref, response))

  return { response }
}

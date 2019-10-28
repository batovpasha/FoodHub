import {createStore} from 'redux'
import {devToolsEnhancer} from 'redux-devtools-extension'

import {AppInitialState, AppState} from './types'

export const configureStore = (appInitialState: AppInitialState) =>
  createStore(state => (state as AppState), appInitialState, devToolsEnhancer({}))

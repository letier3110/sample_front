import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { rootReducer } from './reducers'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist'

let store = createStore(rootReducer, devToolsEnhancer())
let persistor = persistStore(store)

export default { store, persistor }

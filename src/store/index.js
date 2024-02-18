import { createStore } from 'redux';
import reducer from './reducer';
import { persistStore } from 'redux-persist';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer);
const persister = persistStore(store);

export { store, persister };

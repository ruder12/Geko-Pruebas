import { combineReducers } from 'redux';

// reducer import
import storage from 'redux-persist/lib/storage';
import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import { persistReducer } from 'redux-persist';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'Geko-'
        },
        accountReducer
    ),
    customization: customizationReducer
});

export default reducer;

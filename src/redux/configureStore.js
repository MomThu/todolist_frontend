import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import { reducer as formReducer } from 'redux-form';
import { createForms } from 'react-redux-form';

import { AllTasks } from './task';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            all_tasks: AllTasks,
            
            form: formReducer, 
            ...createForms({
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
import * as ActionTypes from './ActionTypes';

export const AllTasks = (state = {
        isLoading: true,
        errMess: null,
        tasks: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ALLTASKS:
            return {...state, isLoading: false, errMess: null, tasks: action.payload}
        case ActionTypes.ALLTASKS_LOADING:
            return {...state, isLoading: true, errMess: null, tasks: []}
        case ActionTypes.ALLTASKS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, tasks: []}
        default:
            return state;
    }
}
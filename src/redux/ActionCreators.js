import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'; 

// Get all tasks
// Only all tasks data will be stored in redux store, then only this fetch uses redux
export const fetchAllTasks = () => (dispatch) => {
    dispatch(allTasksLoading(true));
    return fetch(baseUrl + 'tasks')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(all_tasks => {
            for (let i = 0; i < all_tasks.length; ++i)
                for (let j = 0; j < all_tasks.length; ++j) {
                    if (new Date(all_tasks[i].dueDate).getTime() < new Date(all_tasks[j].dueDate).getTime()) {
                        let temp = all_tasks[j];
                        all_tasks[j] = all_tasks[i];
                        all_tasks[i] = temp;
                    }
                }
            return all_tasks;
        })
        .then(all_tasks => dispatch(addAllTasks(all_tasks)))
        .catch(error => dispatch(allTasksFailed(error.message)));
}

export const allTasksLoading = () => ({
    type: ActionTypes.ALLTASKS_LOADING
});

export const allTasksFailed = (errmess) => ({
    type: ActionTypes.ALLTASKS_FAILED,
    payload: errmess
});

export const addAllTasks = (all_tasks) => ({
    type: ActionTypes.ADD_ALLTASKS,
    payload: all_tasks
});

// Post a task
export const postTask = (newTask) => {
    return fetch(baseUrl + 'tasks', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(all_tasks => {
            return all_tasks;
        })
        .catch(error => {
            throw error;
        })
}

// Get one task
export const fetchOneTask = (id) => {
    return fetch(baseUrl + 'tasks/' + id)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(task => {
            return task;
        })
        .catch(error => {
            throw error;
        })
}

// Update one task
export const UpdateOneTask = (id, task) => {
    return fetch(baseUrl + 'tasks/' + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(task => {
            return task;
        })
        .catch(error => {
            throw error;
        })
}

// Delete one task
export const RemoveOneTask = (id) => {
    return fetch(baseUrl + 'tasks/' + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .catch(error => {
            throw error;
        })
}
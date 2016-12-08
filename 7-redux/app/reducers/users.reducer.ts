import {UserActionType} from '../actions/user.actions';

export default (state = {}, action:any = {}) => {
    switch (action.type) {
        case UserActionType.REQUEST_USERS:
            return {...state, isFetching: true};
        case UserActionType.RECEIVE_USERS:
            return{...state, isFetching: false, users: action.users};
        case UserActionType.CURRENT_USER: 
            return {...state, current: action.current};
        default: 
            return state;
    }
};

export function getUsers(state) { return state.users }
export function getCurrentUser(state) { return state.current }
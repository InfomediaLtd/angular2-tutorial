import * as UserActions from "../actions/user-actions";

export default (state = {}, action:any = {}) => {
    switch (action.type) {
        case UserActions.REQUEST_USERS:
            return Object.assign({}, state, {isFetching: true});
        case UserActions.RECEIVE_USERS:
            return Object.assign({}, state, {isFetching: false, users: action.users});
        case UserActions.CURRENT_USER:
            return Object.assign({}, state, {current: action.current});
        default:
            return state;
    }
};

export function getUsers(state) {
  return state.users;
}
export function getCurrentUser(state) {
  return state.current;
}

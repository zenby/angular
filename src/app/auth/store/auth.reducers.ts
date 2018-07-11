import * as AuthActions from './auth.actions';

export interface State {
  authenticated: boolean;
  token: string;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGNUP:
    case AuthActions.SIGNIN:
      return {
        ...state,
        authenticated: true
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null
      };
    default:
      return state;
  }
}


export interface State {
  authenticated: boolean;
  token: string;
}

const initialState: State = {
  token: null,
  authenticated: false
};


export function authReducer(state = initialState, action) {
  return state;
}

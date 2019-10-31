import { Example } from '../actions/types/exampleTypes';

const initialState = {
  world: 'unHello',
};

export const exampleReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case Example.HELLO: {
      return {
        ...state,
        world: payload,
      };
    }
    default:
      return state;
  }
};

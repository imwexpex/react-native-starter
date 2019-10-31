import { Example } from '../types/exampleTypes';

export const exampleCreator = () => async dispatch => {
  dispatch({
    type: Example.HELLO,
    payload: 'HELLO',
  });
};

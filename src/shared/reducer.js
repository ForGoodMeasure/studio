import dotty from 'dotty';

const initialState = {};

const clone = (state, changes) => Object.assign({}, state, changes);

export const customReducer = (state=initialState, action) => {
  return state;
};

import dotty from 'dotty';

const randomProjectId = () => (['rad', 'sex', 'hab', 'sherpa'])[ Math.floor(Math.random() * 4)];

const initialState = {
  startingProjectId: null
};

const clone = (state, changes) => Object.assign({}, state, changes);

export const customReducer = (state=initialState, action) => {
  return {
    startingProjectId: randomProjectId()
  }
};

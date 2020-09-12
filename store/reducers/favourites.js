import { TOGGLE_FAVOURITE } from '../actions/favourites';

export default (state = [], action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const index = state.findIndex(
        vid => vid.playbackUrl === action.payload.playbackUrl
      );

      if (index === -1) return [...state, action.payload];

      return [...state.slice(0, index), ...state.slice(index + 1)];

    default:
      return state;
  }
};

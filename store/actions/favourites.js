export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export const toggleFavourite = video => ({
  type: TOGGLE_FAVOURITE,
  payload: video
});

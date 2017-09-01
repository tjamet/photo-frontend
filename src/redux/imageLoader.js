const LOAD_NEXT_IMAGES = 'LOAD_NEXT_IMAGES';

import {images} from './imagesData.js';

export default function imageLoader(state = [], action = { }) {
    console.log("initialize images")
  if (action.type === LOAD_NEXT_IMAGES) {
    return images;
  }
  return images;

  //return state;
}

export function loadNextImages() {
  return { type: LOAD_NEXT_IMAGES };
}
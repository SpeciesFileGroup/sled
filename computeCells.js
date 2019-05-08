function computeCells(sled, hlines, vlines) {
  let width = sled.image.width;
  let height = sled.image.height;
  // order hlines and vlines
  if((hlines.length > 1) && vlines.length > 1) {
    let hLines = arraySort(hlines, 0);
    let vLines = arraySort(vlines, 1);
    // ignore x-coordinates for hlines, y coordinates for vlines
  }
};

function arraySort(array, direction) {
  return array;
}
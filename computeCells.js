function computeCells(sled, hlines, vlines) {
  let width = sled.image.width;
  let height = sled.image.height;
  // order hlines and vlines
  if((hlines.length > 1) && vlines.length > 1) {
    let hLines = (hlines, 0);
    sled.hlines = sled.hlines.sort(function(a, b){return a - b});
    sled.vlines = sled.vlines.sort(function(a, b){return a - b});
    // compute intersections
    let i = 0;    // horizontal (column) index
    let j = 0;    // vertical (row) index
    let ul, lr;   //upper left, lower right corners of cell
    let cellIndex = 0, hRows = sled.hlines.length - 1, vCols = sled.vlines.length - 1; // one less row/column than lines
    for(j = 0; j < hRows; j++) {
      for(i = 0; i < vCols; i++) {
        cellIndex = hRows * i + j;
        ul = [sled.vlines[i], sled.hlines[j]];
        lr = [sled.vlines[i + 1], sled.hlines[j + 1]];
        sled.cells[cellIndex] = [ul, lr];
      }
    }
  }
};



var sled = {
  width: 1024,                       // horizontal extent of image in pixels
  height: 768,                        // vertical extent of image
  hlines: [500, 100, 200, 700, 450],  // y pixel coord of line
  vlines: [760, 150, 50 ],             // x pixel coord of line
  // rows: 0,                    // count/length of rows - derived
  // columns: 0,                 // count/length of columns - derived
  cells: []                      // pixel coord of upper left, lower right - derived [[0, 0], [0, 0]]
};                                 // cell[row, column] = cell[row*columns + column]
sled = computeCells(sled);
alert(JSON.stringify(sled));    // currently

function computeCells(sled) {
  var width = sled.width;
  var height = sled.height;
  // order hlines and vlines
  if((sled.hlines.length > 1) && sled.vlines.length > 1) {
    sled.hlines = sled.hlines.sort(function(a, b){return a - b;});
    sled.vlines = sled.vlines.sort(function(a, b){return a - b;});
    // compute intersections
    var i = 0;    // horizontal (column) index
    var j = 0;    // vertical (row) index
    var ul, lr;   //upper left, lower right corners of cell
    var cellIndex = 0, hRows = sled.hlines.length - 1, vCols = sled.vlines.length - 1; // one less row/column than lines
    for(j = 0; j < hRows; j++) {
      for(i = 0; i < vCols; i++) {
        cellIndex = hRows * i + j;
        ul = [sled.vlines[i], sled.hlines[j]];
        lr = [sled.vlines[i + 1], sled.hlines[j + 1]];
        // sled.cells[cellIndex] = [ul, lr];
        sled.cells.push([ul, lr]);
      }
    }
  }
  return sled;
};


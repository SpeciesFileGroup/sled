var sled;
sled = { image:
  {
    width:  0,                  // horizontal extent of image in pixels
    height: 0,                  // vertical extent of image
    hlines: [[[0, 0], [0, 0]]], // pixel coord of left, right horizontal endpoints
    vlines: [[[0, 0], [0, 0]]], // pixel coord of upper, lower vertical endpoints
    rows: 0,                    // count/length of rows - derived
    columns: 0,                 // count/length of columns - derived
    cells: [[[0, 0], [0, 0]]]   // pixel coord of upper left, lower right - derived
  }                             // cell[row, column] = cell[row*columns + column]
};
/*
  intersections of hline and vlines determines rows, columns, and cells
  lines' centers will overlay pixel columns or rows, and will duplicate those pixels on adjoining cell edges
 */
<template>
  <div id="sled_test">
    <h1>SLED test page</h1>
    <div class="image-inputs">
      Enter image width
      <input type="number" v-model.number="width" />
      <br>
      Enter image height
      <input type="number" v-model.number="height" />
    </div>
    <div class="line-inputs">
      <div><new-hline @newLine="addNewHline($event)" />
      <input type="button" value="RESET" :click="resetHlines()" />
      </div>
      <div>><new-vline @newLine="addNewVline($event)" />
      <input type="button" value="RESET" :click="resetVlines()" />
      </div>
    </div>
    <div class="cells">
      <table>
        <tr v-for="hline in hlines">
          <template v-if="hline">
            <td v-html="hline"></td>
            <template v-for="vline in vlines">
              <td v-if="vline" v-html="cells[hlines.length*hline + vline]"></td>
            </template>
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import NewHline from './components/newHline'
import NewVline from './components/newVline'

export default {
  components: {
    NewHline,
    NewVline
  },
  data () {
    return {
      width: 1000, // horizontal extent of image in pixels
      height: 750, // vertical extent of image
      hlines: [100, 200, 300],  // y pixel coord of line
      vlines: [100, 200],  // x pixel coord of line
      cells: []    // pixel coord of upper left, lower right - derived, e.g.[[0, 0], [100, 150]]
    }
  },
  methods: {
    addNewHline (y) {
      this.hlines.push(y);
      this.computeCells();
    },
    resetHlines() {
      this.hlines = []
    },
    addNewVline (x) {
      this.vlines.push(x);
      this.computeCells();
    },
    resetVlines() {
      this.vlines = []
    },
    computeCells() {
      if((this.hlines.length > 1) && this.vlines.length > 1) {
        this.hlines = this.hlines.sort(function(a, b){return a - b;});
        this.vlines = this.vlines.sort(function(a, b){return a - b;});
        // compute intersections
        this.cells=[];
        let i = 0;    // horizontal (column) index
        let j = 0;    // vertical (row) index
        let ul, lr;   //upper left, lower right corners of cell
        let cellIndex = 0, hRows = this.hlines.length - 1, vCols = this.vlines.length - 1; // one less row/column than lines
        for(j = 0; j < hRows; j++) {
          for(i = 0; i < vCols; i++) {
            cellIndex = hRows * i + j;
            ul = [this.vlines[i], this.hlines[j]];
            lr = [this.vlines[i + 1], this.hlines[j + 1]];
            // this.cells[cellIndex] = [ul, lr];
            this.cells.push([ul, lr]);
          }
        }
      }

    }
  }
}
</script>

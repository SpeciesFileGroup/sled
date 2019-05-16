<template>
  <div id="sled_test">
    <h1>SLED test page</h1>
    <div class="image-inputs">
      <label>Enter image width</label>
      <input
        type="number"
        v-model.number="width" />
      <br>
      <label>Enter image height</label>
      <input
        type="number"
        v-model.number="height" />
    </div>
    <div class="line-inputs">
      <div>
        <new-hline @newLine="addNewHline" />
        <input
          type="button"
          value="RESET"
          @click="resetHlines()" />
      </div>
      <div>
        <new-vline @newLine="addNewVline" />
        <input
          type="button"
          value="RESET"
          @click="resetVlines()" />
      </div>
    </div>
    <div class="cells">
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="(index) in vlines"> {{ index }} </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hline, hindex) in hlines">
            <td v-html="hline"></td>
            <template v-for="(vline, vindex) in vlines">
              <td v-if="cells[(vlines.length*hindex) + vindex]">
                {{ cells[(vlines.length*hindex) + vindex]}}
              </td>
              <td v-else/>
            </template>
          </tr>
        </tbody>
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
      hlines: [100, 200, 300], // y pixel coord of line
      vlines: [50, 250], // x pixel coord of line
      cells: [] // pixel coord of upper left, lower right - derived, e.g.[[0, 0], [100, 150]]
    }
  },
  mounted () {
    this.computeCells()
  },
  methods: {
    addNewHline (y) {
      this.hlines.push(y)
      this.computeCells()
    },
    resetHlines () {
      this.hlines = []
    },
    addNewVline (x) {
      this.vlines.push(x)
      this.computeCells()
    },
    resetVlines () {
      this.vlines = []
    },
    computeCells () {
      if ((this.hlines.length > 0) && this.vlines.length > 0) {
        this.hlines = this.hlines.sort(function (a, b) { return a - b })
        this.vlines = this.vlines.sort(function (a, b) { return a - b })
        // compute intersections
        this.cells = []
        let i = 0 // horizontal (column) index
        let j = 0 // vertical (row) index
        let ul, lr // upper left, lower right corners of cell
        let cellIndex = 0
        let hRows = this.hlines.length
        let vCols = this.vlines.length // one less row/column than lines
        for (j = 0; j < hRows; j++) {
          for (i = 0; i < vCols; i++) {
            cellIndex = (vCols * j) + i
            ul = [this.vlines[i], this.hlines[j]]
            lr = [this.vlines[i + 1], this.hlines[j + 1]]
            if (lr[0] !== undefined && lr[1] !== undefined) {
              this.cells[cellIndex] = [ul, lr]
            }
          }
        }
      }
    }
  }
}
</script>
<style>
  td {
    width: 220px;
    font-size: 12px;
    border: 1px solid gray;
  }
</style>

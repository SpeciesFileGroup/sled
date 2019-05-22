<template>
  <div id="sled_test">
    <h1>SLED test page</h1>
    <div class="image-inputs">
      <label>Enter image width</label>
      <input
        type="number"
        v-model.number="width" v-on:change="resizeImage" />
      <input type="button" value="+ 100" v-on:click="width+=100" />
      <input type="button" value="- 100" v-on:click="width-=100" />
      <br>
      <label>Enter image height</label>
      <input
        type="number"
        v-model.number="height"  v-on:change="resizeImage" />
      <input type="button" value="+ 100" v-on:click="height+=100" />
      <input type="button" value="- 100" v-on:click="height-=100" />
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
            <th v-for="(index) in vlines">
              <input type="button" value="-100" v-on:click="$set(vlines,index, vlines[index] - 100)" />
              {{ index }}
              <input type="button" value="+100" v-on:click="$set(vlines,index, vlines[index] + 100)" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hline, hindex) in hlines">
            <td v-html="hline"></td>
            <template v-for="(vline, vindex) in vlines">
              <td v-if="cells[(vlines.length*hindex) + vindex]">
                {{ cells[(vlines.length*hindex) + vindex] }}
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

import ImageWidth from './components/imageWidth'
import ImageHeight from './components/imageHeight'
import NewHline from './components/newHline'
import NewVline from './components/newVline'

export default {
  components: {
    ImageWidth,
    ImageHeight,
    NewHline,
    NewVline
  },
  computed: {
    vlinesInOrder() {
      return this.vlines.sort(function (a, b) { return a - b })
    },
    hlinesInOrder() {
      return this.hlines.sort(function (a, b) { return a - b })
    }
  },
  data () {
    return {
      width: 0, // horizontal extent of image in pixels
      height: 0, // vertical extent of image
      hlines: [], // y pixel coord of line
      vlines: [], // x pixel coord of line
      cells: [], // pixel coord of upper left, lower right - derived, e.g.[[0, 0], [100, 150]]
      line_thickness: 1,
      old_width:  0,
      old_height: 0,
    }
  },
  watch: {
    hlines: {
      handler () {
        this.computeCells()
      },
      deep: true
    },
    vlines: {
      handler () {
        this.computeCells()
      },
      deep: true
    }
  },
  mounted () {
    this.computeCells()
  },
  methods: {
    addNewHline (y) {
      this.hlines.push(y)
    },
    resetHlines () {
      this.hlines = []
    },
    addNewVline (x) {
      this.vlines.push(x)
    },
    resetVlines () {
      this.vlines = []
    },
    resizeImage () {  // if image size changes, recompute lines and cells
      this.old_width = this.width;
      this.old_height = this.height;
      // alert();//[this.width, this.height]);
    },
    computeCells () {
      if ((this.hlinesInOrder.length > 0) && this.vlinesInOrder.length > 0) {

        // compute intersections
        this.cells = []
        let i = 0 // horizontal (column) index
        let j = 0 // vertical (row) index
        let ul, lr // upper left, lower right corners of cell
        let cellIndex = 0
        let hRows = this.vlinesInOrder.length
        let vCols = this.vlinesInOrder.length // one less row/column than lines
        for (j = 0; j < hRows; j++) {
          for (i = 0; i < vCols; i++) {
            cellIndex = (vCols * j) + i
            ul = [this.vlinesInOrder[i], this.hlinesInOrder[j]]
            lr = [this.vlinesInOrder[i + 1], this.hlinesInOrder[j + 1]]
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
    width: 330px;
    font-size: 12px;
    border: 1px solid gray;
  }
</style>

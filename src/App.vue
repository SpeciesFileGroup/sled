<template>
  <div id="sled_test">
    <h1>SLED test page</h1>
    <input type="file" v-on:change="getImage"/>
    <div class="image-inputs">
      <label>Enter image width</label>
      <input
        type="number"
        v-model.number="width" v-on:change="resizeImage"/>
      <br>
      <label>Enter image height</label>
      <input
        type="number"
        v-model.number="height" v-on:change="resizeImage"/>
      <br>
      <label>Set image divisor</label>
      <input
        type="number"
        v-model.number="scale" v-on:change="resizeImage"/>
    </div>
    <div class="line-inputs">
      <div>
        <new-vline @newLine="addNewVline"/>
        <input
          type="button"
          value="RESET"
          @click="resetVlines()"/>
      </div>
      <div>
        <new-hline @newLine="addNewHline"/>
        <input
          type="button"
          value="RESET"
          @click="resetHlines()"/>
      </div>
    </div>
    <div class="cells">
      <table>
        <thead>
        <tr>
          <th>
            Move grid X: 
            <input type="button" value="-100" size="4" v-on:click="moveX(-100)"/>
            <input type="button" value="-25" size="4" v-on:click="moveX(-25)"/>
            <input type="button" value="-1" size="4" v-on:click="moveX(-1)"/>
            <input type="button" value="+1" size="4" v-on:click="moveX(1)"/>
            <input type="button" value="+25" size="4" v-on:click="moveX(25)"/>
            <input type="button" value="+100" size="4" v-on:click="moveX(100)"/>
            <br>
            Move grid Y:
            <input type="button" value="-100" v-on:click="moveY(-100)"/>
            <input type="button" value="-25" v-on:click="moveY(-25)"/>
            <input type="button" value="-1" v-on:click="moveY(-1)"/>
              <input type="button" value="+1" v-on:click="moveY(1)"/>
            <input type="button" value="+25" v-on:click="moveY(25)"/>
            <input type="button" value="+100" v-on:click="moveY(100)"/>
          </th>
          <th
            v-for="(vline, index) in vLinesInOrder"
            :key="index">
            <input type="button" value="-100" v-on:click="moveV(index, -100)"/>
            <input type="button" value="-25" v-on:click="moveV(index, -25)"/>
            <input type="button" value="-1" v-on:click="moveV(index, -1)"/>
            <input type="button" value="X" v-on:click="removeColumn(index)"/>
            {{ vline }}
            <input type="button" value="+1" v-on:click="moveV(index, 1)"/>
            <input type="button" value="+25" v-on:click="moveV(index, 25)"/>
            <input type="button" value="+100" v-on:click="moveV(index, 100)"/>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(hline, hindex) in hLinesInOrder"
          :key="hindex">
          <td>
            <input type="button" value="-100" v-on:click="moveH(hindex, -100)"/>
            <input type="button" value="-25" v-on:click="moveH(hindex, -25)"/>
            <input type="button" value="-1" v-on:click="moveH(hindex, -1)"/>
            <input type="button" value="X" v-on:click="removeRow(hindex)"/>
            {{ hline }}
            <input type="button" value="+1" v-on:click="moveH(hindex, 1)"/>
            <input type="button" value="+25" v-on:click="moveH(hindex, 25)"/>
            <input type="button" value="+100" v-on:click="moveH(hindex, 100)"/>
          </td>
          <td
            v-for="(vline, vindex) in vLines"
            :key="vindex">
            <template v-if="(vindex < vLines.length - 1) && (cells[(vLines.length - 1)*hindex + vindex])">
            {{ cells[(vLines.length - 1)*hindex + vindex] }}
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div id="svg_container">
      <svg-component
        v-if="saveImageData"
        :image-width="width"
        :image-height="height"
        :image-data="saveImageData"
        :h-lines="hLines"
        :v-lines="vLines"
        @circleUL="moveGrid(200, 200)"
        @circleLR="stretchGrid(150, 300)"
        :scale="scale"/>
    </div>
  </div>
</template>

<script>

import newHline from './components/newHline'
import newVline from './components/newVline'
import SvgComponent from './components/svgComponent'

export default {
  components: {
    SvgComponent,
    newHline,
    newVline
  },
  computed: {
    vLinesInOrder () {
      return this.vLines.sort(function (a, b) {
        return a - b
      })
    },
    hLinesInOrder () {
      return this.hLines.sort(function (a, b) {
        return a - b
      })
    }
  },
  data () {
    return {
      width: 0, // horizontal extent of image in pixels
      height: 0, // vertical extent of image
      hLines: [], // y pixel coord of line
      vLines: [], // x pixel coord of line
      cells: [], // pixel coord of upper left, lower right - derived, e.g.[[0, 0], [100, 150]]
      line_thickness: 1,
      saveImageData: undefined,
      old_width: 0,
      old_height: 0,
      xlt: undefined,
      scale: 8.0,
    }
  },
  watch: {
    hLines: {
      handler () {
        this.computeCells()
      },
      deep: true
    },
    vLines: {
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
      this.hLines.push(y)
    },
    resetHlines () {
      this.hLines = []
    },
    addNewVline (x) {
      this.vLines.push(x)
    },
    resetVlines () {
      this.vLines = []
    },
    moveX(offset) {
      for(let i=0;i<this.vLines.length;i++){
        this.$set(this.vLines,i, this.vLines[i] + offset)
      }
    },
    moveY(offset) {
      for(let i=0;i<this.hLines.length;i++){
        this.$set(this.hLines,i, this.hLines[i] + offset)
      }
    },
    moveV(index, offset) {
      this.$set(this.vLines,index, this.vLines[index] + offset)
    },
    moveH(index, offset) {
      this.$set(this.hLines,index, this.hLines[index] + offset)
    },
    resizeImage () { // if image size changes, recompute lines and cells
      if (this.old_width > 1) { // a previous presumably valid width
        let hScale = this.width / this.old_width
        let h = 0
        let n = this.vLines.length
        for (h = 0; h < n; h++) {
          this.$set(this.vLines, h, Math.round(this.vLines[h] * hScale))
        }
      }
      if (this.old_height > 1) { // a previous presumably valid height
        let vScale = this.height / this.old_height
        let v = 0
        let m = this.hLines.length
        for (v = 0; v < m; v++) {
          this.$set(this.hLines, v, Math.round(this.hLines[v] * vScale))
        }
      }
      this.old_width = this.width
      this.old_height = this.height
      this.computeCells()
    },
    removeRow (index) {
      this.$delete(this.hLines, index)
    },

    removeColumn (index) {
      this.$delete(this.vLines, index)
    },
    computeCells () {
      if ((this.hLines.length > 1) && this.vLines.length > 1) {
        // compute intersections
        this.cells = []
        let i = 0 // horizontal (column) index
        let j = 0 // vertical (row) index
        let ul, lr // upper left, lower right corners of cell
        let cellIndex = 0
        let hRows = this.hLinesInOrder.length - 1 // only enumerate non-empty cells BETWEEN lines
        let vCols = this.vLinesInOrder.length - 1 // one less populated row/column than lines
        for (j = 0; j < hRows; j++) {
          for (i = 0; i < vCols; i++) {
            cellIndex = (vCols * j) + i
            ul = [this.vLinesInOrder[i], this.hLinesInOrder[j]]
            lr = [this.vLinesInOrder[i + 1], this.hLinesInOrder[j + 1]]
            // if (lr[0] !== undefined && lr[1] !== undefined) {   // non-empty cell test
            this.cells[cellIndex] = [ul, lr]
            // }
          }
        }
      }
    },
    getImage (event) {
      let files = event.target.files
      let that = this
      // FileReader support
      if (FileReader && files && files.length) {
        let fileReader = new FileReader()
        fileReader.onload = function (images) {
          let newImage = new Image()
          newImage.src = fileReader.result
          newImage.onload = function () {
            that.old_width = that.width         // shuffle the dimensions
            that.old_height = that.height       // from the previous size
            that.width = newImage.width
            that.height = newImage.height
            that.saveImageData = fileReader.result
            that.resizeImage()
          }
        }
        fileReader.readAsDataURL(files[0])
      }
    },
    stretchGrid(dx, dy) {   // compand the grid by the lower right corner change
      let vLast = this.vLines.length - 1    // number of cells
      let hLast = this.hLines.length - 1
      let old_height = this.hLines[hLast] - this.hLines[0]
      let old_width = this.vLines[vLast] - this.vLines[0]
      let new_width = old_width + dx
      let new_height = old_height + dy
      let hScale = old_height / new_height
      let vscale = old_width / new_width
      let h = 0
      let v = 0
      for(h=1; h<this.vLines.length;h++) {
        this.$set(this.vLines, h, Math.round(this.vLines[h] + h * dx / hLast))
      }
      for(v=1; v<this.hLines.length;v++) {
        this.$set(this.hLines, v, Math.round(this.hLines[v] + v * dy /vLast))
      }
    },
    moveGrid(dx, dy) {
      this.moveX(dx)
      this.moveY(dy)
    }
  }
}
</script>
<style lang="scss">
  input {
    font-size: 8px;
  }
  th {
    width: 400px;
    font-size: 10px;
  }
  td {
    width: 400px;
    font-size: 10px;
    border: 1px solid gray;
  }
  #svg_container {
    display: flex;
    //max-width: 80%;
    position: relative;
  }
  #image {
    height: 100%;
    width: 100%;
    position: relative;
  }
  #svg_layer {
    z-index: 2;
    //height:100%;
    //width:100%;
    position: absolute;
  }
</style>

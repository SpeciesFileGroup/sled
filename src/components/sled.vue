<template>
  <div style="position: relative;">
    <svg-component
      v-if="fileImage"
      :image-width="width"
      :image-height="height"
      :image-data="fileImage"
      :h-lines="hLines"
      :v-lines="vLines"
      :scale="scale"
      :line-thickness="lineWeight"
      @dragUL="moveGrid($event)"
      @dragLR="stretchGrid($event)"
      @dragHline="moveHline($event)"
      @dragVline="moveVline($event)"
    />
    <cell-component
      v-for="(cell, index) in cells"
      :key="index"
      :metadata="metadataAssignment"
      :scale="scale"
      :cell="cell"
      @onChange="updateCell(index, $event)"/>
  </div>
</template>

<script>

import SvgComponent from './svgComponent'
import CellComponent from './cell'

export default {
  name: 'vue-sled',
  components: {
    SvgComponent,
    CellComponent
  },
  props: {
    metadataAssignment: {
      type: Object,
      default: () => { return {} }
    },
    imageWidth: {
      type: Number,
      required: true
    },
    imageHeight: {
      type: Number,
      required: true
    },
    fileImage: {
      type: String
    },
    verticalLines: {
      type: Array,
      required: true
    },
    horizontalLines: {
      type: Array,
      required: true
    },
    scale: {
      type: Number,
      default: 8.0
    },
    lineWeight: {
      type: [Number, String],
      default: 4
    }
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
      old_width: 0,
      old_height: 0
    }
  },
  watch: {
    hLines: {
      handler (newVal) {
        this.hLines = newVal
        this.computeCells()
      },
      deep: true
    },
    vLines: {
      handler (newVal) {
        this.computeCells()
      },
      deep: true
    },
    imageHeight: {
      handler (newVal) {
        this.height = newVal
        this.resizeImage()
      },
      immediate: true
    },
    imageWidth: {
      handler (newVal) {
        this.width = newVal
        this.resizeImage()
      },
      immediate: true
    },
    verticalLines: {
      handler (newVal) {
        this.vLines = newVal
      },
      immediate: true
    },
    horizontalLines: {
      handler (newVal) {
        this.hLines = newVal
      },
      immediate: true
    },
    fileImage (newVal) {
      this.old_width = this.width
      this.old_height = this.height
      this.width = this.width
      this.height = this.height
      this.resizeImage()
    }
  },
  mounted () {
    this.computeCells()
  },
  methods: {
    updateCell (index, cell) {
      this.$set(this.cells, index, cell)
      this.$emit('onComputeCells', this.cells)
    },
    moveX (offset) { // move all vertical lines by x-offset
      for (let i = 0; i < this.vLines.length; i++) {
        this.moveV(i, offset)
      }
    },
    moveY (offset) { // move all horizontal lines by y-offset
      for (let i = 0; i < this.hLines.length; i++) {
        this.moveH(i, offset)
      }
    },
    moveV (index, offset) { // move a single vertical line by x-offset
      this.$set(this.vLines, index, Math.round(this.vLines[index] + offset))
    },
    moveH (index, offset) { // move a single horizontal line by y-offset
      this.$set(this.hLines, index, Math.round(this.hLines[index] + offset))
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
    equalizeLines () {
      if ((this.hLines.length > 1) && this.vLines.length > 1) {
        // compute intersections
        this.cells = []
        let i = 0 // horizontal (column) index
        let j = 0 // vertical (row) index
        let hRows = this.hLinesInOrder.length - 1 // only enumerate non-empty cells BETWEEN lines
        let vCols = this.vLinesInOrder.length - 1 // one less populated row/column than lines
        let hSize = (this.hLines[hRows] - this.hLines[0]) / hRows
        let vSize = (this.vLines[vCols] - this.vLines[0]) / vCols
        for (j = 0; j < hRows; j++) {
          this.$set(this.hLines, j, Math.round(this.hLines[0] + j * hSize))
        }
        for (i = 0; i < vCols; i++) {
          this.$set(this.vLines, i, Math.round(this.vLines[0] + i * vSize))
        }
        this.computeCells()
      }
    },
    computeCells () {
      if ((this.hLines.length > 1) && this.vLines.length > 1) {
        // compute intersections
        // this.cells = []
        let i = 0 // horizontal (column) index
        let j = 0 // vertical (row) index
        let ul, lr // upper left, lower right corners of cell
        let cellIndex = 0
        let hRows = this.hLinesInOrder.length - 1 // only enumerate non-empty cells BETWEEN lines
        let vCols = this.vLinesInOrder.length - 1 // one less populated row/column than lines
        for (j = 0; j < hRows; j++) {
          for (i = 0; i < vCols; i++) {
            cellIndex = (vCols * j) + i

            ul = { x: this.vLinesInOrder[i], y: this.hLinesInOrder[j] }
            lr = { x: this.vLinesInOrder[i + 1], y: this.hLinesInOrder[j + 1] }

            this.$set(this.cells, cellIndex, {
              index: cellIndex,
              cornerUpper: ul,
              cornerLower: lr,
              metadata: this.cells[cellIndex] ? this.cells[cellIndex].metadata : undefined,
              checked: this.cells[cellIndex] ? this.cells[cellIndex].checked : true
            })
          }
        }
        this.$emit('onComputeCells', this.cells)
      }
    },
    generateJSON () {
      return JSON.stringify(this.cells)
    },
    stretchGrid (deltas) { // compand the grid by the lower right corner change
      let dx = deltas[0]
      let dy = deltas[1]
      let vLast = this.vLines.length - 1 // number of cells
      let hLast = this.hLines.length - 1
      let h = 0
      let v = 0
      for (h = 1; h < this.vLines.length; h++) {
        this.$set(this.vLines, h, Math.round(this.vLines[h] + h * dx / vLast))
      }
      for (v = 1; v < this.hLines.length; v++) {
        this.$set(this.hLines, v, Math.round(this.hLines[v] + v * dy / hLast))
      }
    },
    moveGrid (deltas) {
      let dx = deltas[0]
      let dy = deltas[1]
      this.moveX(dx)
      this.moveY(dy)
    },
    moveHline (deltas) {
      let dy = deltas[1]
      let iy = deltas[2]
      this.moveH(iy, dy) // effect line change through common function
    },
    moveVline (deltas) {
      let dx = deltas[0]
      let ix = deltas[2]
      this.moveV(ix, dx)
    }
  }
}
</script>

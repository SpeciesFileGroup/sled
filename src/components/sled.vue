<template>
  <div
    :style="{
      display: 'block',
      position: 'relative',
      height: `${height}px` }">
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
      :locked="locked"
      :metadata="metadataAssignment"
      :scale="scale"
      v-model="cells[index]"
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
      default: () => ({})
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

    lineWeight: {
      type: [Number, String],
      default: 4
    },

    autosize: {
      type: Boolean,
      default: true
    },

    locked: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    'onComputeCells',
    'resize'
  ],

  computed: {
    vLinesInOrder () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.vLines.sort((a, b) => a - b)
    },
    hLinesInOrder () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.hLines.sort((a, b) => a - b)
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
      old_height: 0,
      observeContainer: undefined,
      scale: 1
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
      this.resizeImage()
    },

    autosize: {
      handler (newVal) {
        if (newVal) {
          this.observeContainer = new ResizeObserver(this.resizeSled)
          this.observeContainer.observe(this.$el)
        } else {
          this.observeContainer.disconnect()
        }
        this.scale = this.scaleForScreen()
      }
    }
  },

  mounted () {
    this.computeCells()
    if (this.autosize) {
      this.observeContainer = new ResizeObserver(this.resizeSled)
      this.observeContainer.observe(this.$el)
    }
  },

  unmounted () {
    this.observeContainer.disconnect()
  },

  methods: {
    updateCell (index, cell) {
      this.cells[index] = cell
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
      const value = Math.round(this.vLines[index] + offset)
      if (value < 0 || value > this.imageWidth) return
      this.vLines[index] = value
    },

    moveH (index, offset) { // move a single horizontal line by y-offset
      const value = Math.round(this.hLines[index] + offset)
      if (value < 0 || value > this.imageHeight) return
      this.hLines[index] = Math.round(this.hLines[index] + offset)
    },

    resizeImage () { // if image size changes, recompute lines and cells
      if (this.old_width > 1) { // a previous presumably valid width
        const hScale = this.width / this.old_width
        const n = this.vLines.length
        let h = 0

        for (h = 0; h < n; h++) {
          this.vLines[h] = Math.round(this.vLines[h] * hScale)
        }
      }
      if (this.old_height > 1) { // a previous presumably valid height
        const vScale = this.height / this.old_height
        const m = this.hLines.length
        let v = 0

        for (v = 0; v < m; v++) {
          this.hLines[v] = Math.round(this.hLines[v] * vScale)
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
        const hRows = this.hLinesInOrder.length - 1 // only enumerate non-empty cells BETWEEN lines
        const vCols = this.vLinesInOrder.length - 1 // one less populated row/column than lines
        const hSize = (this.hLines[hRows] - this.hLines[0]) / hRows
        const vSize = (this.vLines[vCols] - this.vLines[0]) / vCols
        for (j = 0; j < hRows; j++) {
          this.hLines[j] = Math.round(this.hLines[0] + j * hSize)
        }
        for (i = 0; i < vCols; i++) {
          this.vLines[i] = Math.round(this.vLines[0] + i * vSize)
        }
        this.computeCells()
      }
    },

    computeCells () {
      if ((this.hLines.length > 0) && this.vLines.length > 0) {
        // compute intersections
        // this.cells = []
        let i = 0 // horizontal (column) index
        let j = 0 // vertical (row) index
        let ul, lr // upper left, lower right corners of cell
        let cellIndex = -1
        const hRows = this.hLinesInOrder.length - 1 // only enumerate non-empty cells BETWEEN lines
        const vCols = this.vLinesInOrder.length - 1 // one less populated row/column than lines
        for (j = 0; j < hRows; j++) {
          for (i = 0; i < vCols; i++) {
            cellIndex = (vCols * j) + i

            ul = { x: this.vLinesInOrder[i], y: this.hLinesInOrder[j] }
            lr = { x: this.vLinesInOrder[i + 1], y: this.hLinesInOrder[j + 1] }

            this.cells[cellIndex] = {
              index: cellIndex,
              upperCorner: ul,
              lowerCorner: lr,
              row: j,
              column: i,
              metadata: this.cells[cellIndex] ? this.cells[cellIndex].metadata : null,
              textfield: this.cells[cellIndex] ? this.cells[cellIndex].textfield : undefined,
              checked: this.cells[cellIndex] ? this.cells[cellIndex].checked : true
            }
          }
        }
        this.cells = cellIndex === -1 ? [] : this.cells.slice(0, cellIndex + 1)
        this.$emit('onComputeCells', this.cells.map(item => { delete item.checked; return item }))
      }
    },

    generateJSON () {
      return JSON.stringify(this.cells)
    },

    stretchGrid (deltas) { // compand the grid by the lower right corner change
      const dx = deltas[0]
      const dy = deltas[1]
      const vLast = this.vLines.length - 1 // number of cells
      const hLast = this.hLines.length - 1
      let h = 0
      let v = 0

      for (h = 1; h < this.vLines.length; h++) {
        const value = Math.round(this.vLines[h] + h * dx / vLast)
        if (value > 0 && value < this.imageWidth) {
          this.vLines[h] = Math.round(this.vLines[h] + h * dx / vLast)
        }
      }
      for (v = 1; v < this.hLines.length; v++) {
        const value = Math.round(this.hLines[v] + v * dy / hLast)
        if (value > 0 && value < this.imageHeight) {
          this.hLines[v] = Math.round(this.hLines[v] + v * dy / hLast)
        }
      }
    },

    moveGrid (deltas) {
      const dx = deltas[0]
      const dy = deltas[1]

      this.moveX(dx)
      this.moveY(dy)
    },

    moveHline (deltas) {
      const dy = deltas[1]
      const iy = deltas[2]

      this.moveH(iy, dy) // effect line change through common function
    },

    moveVline (deltas) {
      const dx = deltas[0]
      const ix = deltas[2]

      this.moveV(ix, dx)
    },

    scaleForScreen () {
      if (this.autosize) {
        const scaleHeight = this.$el.getBoundingClientRect().height < this.height ? this.height / this.$el.getBoundingClientRect().height : 1
        const scaleWidth = this.$el.getBoundingClientRect().width < this.width ? this.width / this.$el.getBoundingClientRect().width : 1
        return scaleHeight > scaleWidth ? scaleHeight : scaleWidth
      } else {
        return 1
      }
    },

    resizeSled (mutationsList, observer) {
      const element = this.$el.getBoundingClientRect()

      this.scale = this.scaleForScreen()
      this.$emit('resize', {
        x: element.x,
        y: element.y,
        top: element.top,
        left: element.left,
        right: element.right,
        bottom: element.bottom,
        width: element.width,
        height: element.height,
        scale: this.scale
      })
    }
  }
}
</script>

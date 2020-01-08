<template>
  <svg id="svg_layer"
    :width="imageWidth/scale"
    :height="imageHeight/scale"
    style="z-index: 2; position: absolute;">
    <image
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width="imageWidth/scale"
      :height="imageHeight/scale"
      :xlink:href="imageData" />
    <template v-if="(hLines.length > 1) && (vLines.length > 1)">
      <svg-line
        v-for="(item, index) in hLines"
        :key="generateRandomKey(index)"
        :x1="vLines[0]"
        :y1="hLines[index]"
        :x2="vLines[vLines.length - 1]"
        :y2="hLines[index]"
        :scale="scale"
        :line-thickness="lineThickness"
        @dragging="dragging = true;  dragIndex = [-1, index]"
      />
      <svg-line
        v-for="(item, index) in vLines"
        :key="generateRandomKey(index)"
        :x1="vLines[index]"
        :y1="hLines[0]"
        :x2="vLines[index]"
        :y2="hLines[hLines.length - 1]"
        :scale="scale"
        :line-thickness="lineThickness"
        :index="index"
        :dragging="dragging"
        @dragging="dragging = true; dragIndex = [index, -1]"
        @mousemove="deltas = $event"
      />
      <svg-circle
        :ix="0"
        :iy="0"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        stroke-color="red"
        style="cursor: move"
        @dragging="dragging = true; draggingCorner = 'dragUL'; dragIndex = $event"
      />
      <svg-circle
        :ix="vLines.length - 1"
        :iy="hLines.length - 1"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        stroke-color="red"
        style="cursor: nwse-resize"
        @dragging="dragging = true; draggingCorner = 'dragLR'; dragIndex = $event"
      />
    </template>
  </svg>
</template>

<script>

import SvgLine from './svgLine'
import SvgCircle from './svgCircle'

export default {
  components: {
    SvgLine,
    SvgCircle
  },
  props: {
    imageData: {
      type: String,
      required: true
    },
    imageWidth: {
      type: Number,
      required: true
    },
    imageHeight: {
      type: Number,
      required: true
    },
    scale: {
      type: Number,
      default: 1
    },
    hLines: {
      type: Array,
      required: true
    },
    vLines: {
      type: Array,
      required: true
    },
    lineThickness: {
      type: Number
    }
  },
  data () {
    return {
      hBubble: [0, 0, -1],
      vBubble: [0, 0, -1], // x, y, line index
      dragging: false,
      deltas: undefined,
      dragIndex: [],
      draggingCorner: undefined
    }
  },
  mounted () {
    window.addEventListener('mouseup', e => {
      this.dragging = false; 
      this.draggingCorner = undefined; 
    })
    window.addEventListener('mousemove', e => {
      this.mouseMove(e)
    })
  },
  methods: {
    generateRandomKey (index = 0) {
      return Math.random().toString(16).substr(2, 8) + index
    },
    sendEventUL () {
      this.$emit('circleUL', true)
    },
    sendEventLR () {
      this.$emit('circleLR', true)
    },
    dragUL (deltas) {
      let dx = event.layerX * this.scale - this.vLines[deltas[0]]
      let dy = event.layerY * this.scale - this.hLines[deltas[1]]
      this.$emit('dragUL', [dx, dy])
    },
    dragLR (deltas) {
      let dx = event.layerX * this.scale - this.vLines[deltas[0]]
      let dy = event.layerY * this.scale - this.hLines[deltas[1]]
      this.$emit('dragLR', [dx, dy])
    },
    mouseMove (event) {
      if (this.dragging) {

        let dx = (event.clientX - (this.$el.getBoundingClientRect().left + document.body.scrollLeft)) - (this.vLines[this.dragIndex[0]]/this.scale)
        let dy = (event.clientY - (this.$el.getBoundingClientRect().top + document.body.scrollTop)) - (this.hLines[this.dragIndex[1]]/this.scale)

        if (this.draggingCorner) {
          this.$emit(this.draggingCorner, [dx, dy])
        } else { // dragging either vertical or horzontal line
          if (this.dragIndex[0] >= 0) { // so only one of the indices is semipositive
            this.$emit('dragVline', [dx, dy, this.dragIndex[0]])
          } else {
            this.$emit('dragHline', [dx, dy, this.dragIndex[1]])
          }
        }
      }
    }
  }
}
</script>

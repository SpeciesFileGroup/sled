<template>
  <svg id="svg_layer"
    :width="imageWidth/scale"
    :height="imageHeight/scale"
    @mouseup="dragging = false; draggingCorner = undefined; removeBubble"
    @mousemove="mouseMove">
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
        :index="index"
        :dragging="dragging"
        @hBubble="showHbubble($event)"
        @vBubble="showVbubble($event)"
        @removeBubble="removeBubble"
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
        @hBubble="showHbubble($event)"
        @vBubble="showVbubble($event)"
        @removeBubble="removeBubble"
      />
      <svg-circle
        :ix="0"
        :iy="0"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        stroke-color="red"
        @dragging="dragging = true; draggingCorner = 'dragUL'; dragIndex = $event"
      />
      <svg-circle
        :ix="vLines.length - 1"
        :iy="hLines.length - 1"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        stroke-color="red"
        @dragging="dragging = true; draggingCorner = 'dragLR'; dragIndex = $event"
      />
      <svg-circle v-if="hBubble[2]>=0"
        :ix="-1"
        :iy="hBubble[2]"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        @dragging="dragging = true; dragIndex = $event"
        @mousemove="deltas = $event"
      />
      <svg-circle v-if="vBubble[2]>=0"
        :ix="vBubble[2]"
        :iy="-1"
        :h-lines="hLines"
        :v-lines="vLines"
        :scale="scale"
        @dragging="dragging = true; dragIndex = $event"
        @mousemove="deltas = $event"
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
        let dx = event.layerX * this.scale - this.vLines[this.dragIndex[0]]
        let dy = event.layerY * this.scale - this.hLines[this.dragIndex[1]]
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
    },
    showHbubble (location) {
      this.hBubble = location // set the drag bubble for this line
      this.vBubble = [0, 0, -1]
    },
    showVbubble (location) {
      this.vBubble = location
      this.hBubble = [0, 0, -1] // clear the other axis bubble
    },
    removeBubble () { // clear both axes' bubbles
      this.vBubble = [0, 0, -1]
      this.hBubble = [0, 0, -1]
    }
  }
}
</script>
<style scoped>
  #svg_container {
    display: flex;
    max-width: 100%;
    position: relative;
  }
  #image {
    height: 100%;
    width: 100%;
    position: relative;
  }
  #svg_layer {
    z-index: 2;
    position: absolute;
  }
</style>
